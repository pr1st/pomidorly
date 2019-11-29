package service

import model.*
import org.jetbrains.exposed.sql.*
import service.DatabaseFactory.dbQuery

class PomidorlyService {

    suspend fun getAllTasks(): List<Task> = dbQuery {
        Tasks.selectAll().map { toTask(it) }
    }

    suspend fun getTask(id: Int): Task? = dbQuery {
        Tasks.select {
            (Tasks.id eq id)
        }.mapNotNull { toTask(it) }
            .singleOrNull()
    }

    suspend fun updateTask(task: NewTask): Task? {
        val id = task.id
        return if (id == null) {
            addTask(task)
        } else {
            dbQuery {
                Tasks.update({ Tasks.id eq id }) {
                    it[description] = task.description
                }
            }
            getTask(id)
        }
    }

    suspend fun addTask(task: NewTask): Task {
        var key = 0
        dbQuery {
            key = (Tasks.insert {
                it[description] = task.description
            } get Tasks.id)
        }
        return getTask(key)!!
    }

    suspend fun deleteTask(id: Int): Boolean {
        return dbQuery {
            Tasks.deleteWhere { Tasks.id eq id } > 0
        }
    }

    private fun toTask(row: ResultRow): Task =
        Task(
            id = row[Tasks.id],
            description = row[Tasks.description]
        )
}