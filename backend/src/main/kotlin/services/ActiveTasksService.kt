package services

import model.*
import org.jetbrains.exposed.sql.*
import DatabaseFactory.dbQuery
import java.lang.IllegalArgumentException

class ActiveTasksService {

    suspend fun getAllTasks(userId: Int): List<ActiveTaskDTO> = dbQuery {
        ActiveTasks.select {
            (ActiveTasks.userId eq userId)
        }.map { toActiveTask(it).toDTO() }
    }

    suspend fun getTask(taskId: Int, userId: Int): ActiveTaskDTO? = dbQuery {
        ActiveTasks.select {
            ((ActiveTasks.id eq taskId) and (ActiveTasks.userId eq userId))
        }.mapNotNull { toActiveTask(it).toDTO() }
            .singleOrNull()
    }

    suspend fun updateTask(task: ActiveTaskDTO, uid: Int): Boolean {
        val id = task.id ?: throw IllegalArgumentException()
        return dbQuery {
            ActiveTasks.update({ (ActiveTasks.id eq id) and (ActiveTasks.userId eq uid) }) {
                it[tag] = task.tag
                it[description] = task.description
                it[numberOfPomidors] = task.numberOfPomidors
            } > 0
        }
    }

    suspend fun addTask(task: ActiveTaskDTO, uid: Int) {
        dbQuery {
            ActiveTasks.insert {
                it[tag] = task.tag
                it[description] = task.description
                it[numberOfPomidors] = task.numberOfPomidors
                it[userId] = uid
            }
        }
    }

    suspend fun deleteTask(id: Int, uid: Int): Boolean {
        return dbQuery {
            ActiveTasks.deleteWhere { (ActiveTasks.id eq id) and (ActiveTasks.userId eq uid) } > 0
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