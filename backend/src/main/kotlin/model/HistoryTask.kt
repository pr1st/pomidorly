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
    val timeFinished: Long,
    val userId: Int
)

fun HistoryTask.toDTO() = HistoryTaskDTO(id, tag, description, timeFinished)

data class HistoryTaskDTO(
    val id: Int?,
    val tag: String,
    val description: String,
    val timeFinished: Long
)
