package services

import DatabaseFactory.dbQuery
import model.*
import org.jetbrains.exposed.sql.*

class HistoryTasksService {

    suspend fun getAllTasks(userId: Int): List<HistoryTaskDTO> = dbQuery {
        HistoryTasks.select {
            (ActiveTasks.userId eq userId)
        }.map { toHistoryTask(it).toDTO() }
    }

    suspend fun addTask(task: HistoryTaskDTO, uid: Int) {
        dbQuery {
            HistoryTasks.insert {
                it[tag] = task.tag
                it[description] = task.description
                it[timeFinished] = task.timeFinished
                it[userId] = uid
            }
        }
    }

    suspend fun deleteTask(id: Int, uid: Int): Boolean {
        return dbQuery {
            HistoryTasks.deleteWhere { (HistoryTasks.id eq id) and (HistoryTasks.userId eq uid) } > 0
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