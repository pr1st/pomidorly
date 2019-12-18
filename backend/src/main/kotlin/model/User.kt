package model

import org.jetbrains.exposed.sql.Table

object Users : Table() {
    val id = integer("id").primaryKey().autoIncrement()
    val username = varchar("username", 255).uniqueIndex()
    val password = varchar("password", 255)
}

data class User(
    val id: Int,
    val username: String,
    val password: String
)

fun User.toDTO() = UserDTO(username, password)

data class UserDTO(
    val username: String,
    val password: String
)

data class TokenDTO(
    val token: String,
    val expiresIn: Int
)


