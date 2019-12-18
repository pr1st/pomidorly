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
                it[login] = user.login
                it[password] = user.password
            }
        }
        return getUser(user.login)!!
    }

    suspend fun getUserByToken(token: String): User? = dbQuery {
        Users.select {
            (Users.password eq token)
        }.mapNotNull { toUser(it) }
            .singleOrNull()
    }

    suspend fun getUser(login: String): User? = dbQuery {
        Users.select {
            (Users.login eq login)
        }.mapNotNull { toUser(it) }
            .singleOrNull()
    }

    private fun toUser(row: ResultRow): User =
        User(
            id = row[Users.id],
            login = row[Users.login],
            password = row[Users.password]
        )

}