package services

import DatabaseFactory.dbQuery
import model.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.util.*
import java.util.Date
import kotlin.streams.asSequence

class UsersService {

    fun getRandomToken(): String {
        val source = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return java.util.Random().ints(20, 0, source.length)
            .asSequence()
            .map(source::get)
            .joinToString("")
    }

    suspend fun addUser(user: UserDTO): User {
        dbQuery {
            Users.insert {
                it[login] = user.login
                it[password] = user.password
                it[token] = ""
                it[validUpTo] = 0
            }
        }
        return getUser(user.login)!!
    }

    suspend fun authorizeUser(login: String): User {
        dbQuery {
            Users.update({ Users.login eq login }) {
                it[token] = getRandomToken()
                it[validUpTo] = 60000 + Date().time
            }
        }
        return getUser(login)!!
    }

    suspend fun getUserByToken(token: String): User? = dbQuery {
        Users.select {
            (Users.token eq token)
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
            password = row[Users.password],
            token = row[Users.token],
            validUpTo = row[Users.validUpTo]
        )

}