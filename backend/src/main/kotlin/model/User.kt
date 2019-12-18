package model

import org.jetbrains.exposed.sql.Table

object Users : Table() {
    val id = integer("id").primaryKey().autoIncrement()
    val login = varchar("login", 255).uniqueIndex()
    val password = varchar("password", 255)
}

data class User(
    val id: Int,
    val login: String,
    val password: String
)

data class UserDTO(
    val login: String,
    val password: String
)

data class TokenDTO(
    val token: String,
    val expiresIn: Int
)


