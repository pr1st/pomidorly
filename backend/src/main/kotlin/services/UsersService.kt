package services

import DatabaseFactory.dbQuery
import model.User
import model.Users
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.select

class UsersService {

    suspend fun getUserId(token: String): Int? = dbQuery {
        Users.select {
            (Users.password eq token)
        }.mapNotNull { toUser(it).id }
            .singleOrNull()
    }

    private fun toUser(row: ResultRow): User =
        User(
            id = row[Users.id],
            username = row[Users.username],
            password = row[Users.password]
        )
}