package model

import org.jetbrains.exposed.sql.Table

object Tasks : Table() {
    val id = integer("id").primaryKey().autoIncrement()
    val description = varchar("description", 4095)
    val tag = varchar("tag", 255)
    val numberOfPomidors = integer("number_of_pomidors")
    val inQueue = integer("in_queue")
    val userId = (integer("user_id") references Users.id)
}

data class Task(
    val id: Int,
    val description: String,
    val tag: String,
    val numberOfPomidors: Int,
    val inQueue: Int,
    val userId: Int
)

data class NewTask(
    val description: String,
    val tag: String,
    val numberOfPomidors: Int
)
