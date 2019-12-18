package services

import DatabaseFactory.dbQuery
import model.User
import model.UserDTO
import model.Users
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select

class UsersService {

    suspend fun isUserExists(user: UserDTO): Boolean = dbQuery {
        Users.select {
            (Users.username eq user.username)
        }.mapNotNull { toUser(it) }
            .isNotEmpty()
    }

    suspend fun addUser(user: UserDTO): User {
        var userId = 0
        dbQuery {
            userId = (Users.insert {
                it[username] = user.username
                it[password] = user.password
            } get Users.id)
        }
        return getUser(userId)!!
    }

    suspend fun getUser(token: String): User? = dbQuery {
        Users.select {
            (Users.password eq token)
        }.mapNotNull { toUser(it) }
            .singleOrNull()
    }

    suspend fun getUser(userId: Int): User? = dbQuery {
        Users.select {
            (Users.id eq userId)
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