package model

import org.jetbrains.exposed.sql.Table

object Users : Table() {
    val id = integer("id").primaryKey().autoIncrement()
    val username = varchar("username", 255)
    val password = varchar("password", 255)
}

data class User(
    val id: Int,
    val username: String,
    val password: String
)

data class NewUser(
    val username: String,
    val password: String
)

data class Token(
    val token: String,
    val expiresIn: Int
)


