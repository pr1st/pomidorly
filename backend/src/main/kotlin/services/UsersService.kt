package services

import DatabaseFactory.dbQuery
import model.User
import model.UserDTO
import model.Users
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select

class UsersService {

    suspend fun addUser(user: UserDTO): User {
        dbQuery {
            Users.insert {
                it[username] = user.username
                it[password] = user.password
            }
        }
        return getUser(user.username)!!
    }

    suspend fun getUserByToken(token: String): User? = dbQuery {
        Users.select {
            (Users.password eq token)
        }.mapNotNull { toUser(it) }
            .singleOrNull()
    }

    suspend fun getUser(username: String): User? = dbQuery {
        Users.select {
            (Users.username eq username)
        }.mapNotNull { toUser(it) }
            .singleOrNull()
    }

    private fun toUser(row: ResultRow): User =
        User(
            id = row[Users.id],
            username = row[Users.username],
            password = row[Users.password]
        )

}