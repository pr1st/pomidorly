package model

import org.jetbrains.exposed.sql.Table

object ActiveTasks : Table() {
    val id = integer("id").primaryKey().autoIncrement()
    val tag = varchar("tag", 255)
    val description = varchar("description", 4095)
    val numberOfPomidors = integer("number_of_pomidors")
    val inQueue = integer("in_queue")
    val userId = (integer("user_id") references Users.id)
}

data class ActiveTask(
    val id: Int,
    val tag: String,
    val description: String,
    val numberOfPomidors: Int,
    val inQueue: Int,
    val userId: Int
)

fun ActiveTask.toDTO() = ActiveTaskDTO(id, tag, description, numberOfPomidors, inQueue)

data class ActiveTaskDTO(
    val id: Int?,
    val tag: String,
    val description: String,
    val numberOfPomidors: Int,
    val inQueue: Int?
)
