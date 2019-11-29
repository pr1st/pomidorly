package model

import org.jetbrains.exposed.sql.Table

object Tasks : Table() {
    val id = integer("id").primaryKey().autoIncrement()
    val description = varchar("description", 255)
//    val userId = (integer("user_id") references Users.id)
}

data class Task(
    val id: Int,
    val description: String
//    val userId: Int
)

data class NewTask(
    val id: Int?,
    val description: String
//    val userId: Int
)
