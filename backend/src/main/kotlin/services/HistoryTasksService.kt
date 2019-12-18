package services

import DatabaseFactory.dbQuery
import model.HistoryTask
import model.HistoryTaskDTO
import model.HistoryTasks
import org.jetbrains.exposed.sql.*

class HistoryTasksService {

    suspend fun getAllTasks(userId: Int): List<HistoryTask> = dbQuery {
        HistoryTasks.select {
            (HistoryTasks.userId eq userId)
        }.map { toHistoryTask(it) }
    }

    suspend fun getTask(taskId: Int, userId: Int): HistoryTask? = dbQuery {
        HistoryTasks.select {
            ((HistoryTasks.id eq taskId) and (HistoryTasks.userId eq userId))
        }.mapNotNull { toHistoryTask(it) }
            .singleOrNull()
    }

    suspend fun addTask(task: HistoryTaskDTO, userId: Int): HistoryTask {
        var taskId = 0
        dbQuery {
            taskId = (HistoryTasks.insert {
                it[tag] = task.tag
                it[description] = task.description
                it[timeFinished] = task.timeFinished
                it[this.userId] = userId
            } get HistoryTasks.id)
        }
        return getTask(taskId, userId)!!
    }

    suspend fun deleteTask(taskId: Int, userId: Int): Boolean {
        return dbQuery {
            HistoryTasks.deleteWhere { (HistoryTasks.id eq taskId) and (HistoryTasks.userId eq userId) } > 0
        }
    }

    private fun toHistoryTask(row: ResultRow): HistoryTask =
        HistoryTask(
            id = row[HistoryTasks.id],
            tag = row[HistoryTasks.tag],
            description = row[HistoryTasks.description],
            timeFinished = row[HistoryTasks.timeFinished],
            userId = row[HistoryTasks.userId]
        )
}