package model

import org.jetbrains.exposed.sql.Table

object HistoryTasks : Table() {
    val id = integer("id").primaryKey().autoIncrement()
    val tag = varchar("tag", 255)
    val description = varchar("description", 4095)
    val timeFinished = long("time_finished")
    val userId = (integer("user_id") references Users.id)
}

data class HistoryTask(
    val id: Int,
    val tag: String,
    val description: String,
    val userId: Int
)

data class NewHistoryTask(
    val id: Int?,
    val tag: String,
    val description: String,
    val timeFinished: Int
)
