package services

import DatabaseFactory.dbQuery
import model.ActiveTask
import model.ActiveTaskDTO
import model.ActiveTasks
import org.jetbrains.exposed.sql.*

class ActiveTasksService {

    suspend fun getAllTasks(userId: Int): List<ActiveTask> = dbQuery {
        ActiveTasks.select {
            (ActiveTasks.userId eq userId)
        }.map { toActiveTask(it) }
    }

    suspend fun getTask(taskId: Int, userId: Int): ActiveTask? = dbQuery {
        ActiveTasks.select {
            ((ActiveTasks.id eq taskId) and (ActiveTasks.userId eq userId))
        }.mapNotNull { toActiveTask(it) }
            .singleOrNull()
    }

    suspend fun addTask(task: ActiveTaskDTO, userId: Int): ActiveTask {
        var taskId = 0
        dbQuery {
            taskId = (ActiveTasks.insert {
                it[tag] = task.tag
                it[description] = task.description
                it[numberOfPomidors] = task.numberOfPomidors
                it[this.userId] = userId
            } get ActiveTasks.id)
        }
        return getTask(taskId, userId)!!
    }

    suspend fun updateTask(taskId: Int, task: ActiveTaskDTO, userId: Int): ActiveTask? {
        dbQuery {
            ActiveTasks.update({ (ActiveTasks.id eq taskId) and (ActiveTasks.userId eq userId) }) {
                it[tag] = task.tag
                it[description] = task.description
                it[numberOfPomidors] = task.numberOfPomidors
            }
        }
        return getTask(taskId, userId)
    }

    suspend fun <T> updateField(taskId: Int, column: Column<T>, value: T, userId: Int): ActiveTask? {
        dbQuery {
            ActiveTasks.update({ (ActiveTasks.id eq taskId) and (ActiveTasks.userId eq userId) }) {
                it[column] = value
            }
        }
        return getTask(taskId, userId)
    }

    suspend fun deleteTask(taskId: Int, userId: Int): Boolean {
        return dbQuery {
            ActiveTasks.deleteWhere { (ActiveTasks.id eq taskId) and (ActiveTasks.userId eq userId) } > 0
        }
    }

    private fun toActiveTask(row: ResultRow): ActiveTask =
        ActiveTask(
            id = row[ActiveTasks.id],
            tag = row[ActiveTasks.tag],
            description = row[ActiveTasks.description],
            numberOfPomidors = row[ActiveTasks.numberOfPomidors],
            inQueue = row[ActiveTasks.inQueue],
            userId = row[ActiveTasks.userId]
        )
}