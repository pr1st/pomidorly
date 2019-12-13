import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import model.ActiveTasks
import model.Users
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils.create
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseFactory {

    fun init() {
        Database.connect(hikari())
        transaction {
            create(Users)
            Users.insert {
                it[username] = "Jack"
                it[password] = "ABBA"
            }
            Users.insert {
                it[username] = "Egor Letov"
                it[password] = "GROB"
            }
            create(ActiveTasks)
            ActiveTasks.insert {
                it[tag] = "tag1"
                it[description] = "task one"
                it[numberOfPomidors] = 3
                it[userId] = 1
            }
            ActiveTasks.insert {
                it[tag] = "tag1"
                it[description] = "task two"
                it[numberOfPomidors] = 10
                it[userId] = 2
            }
            ActiveTasks.insert {
                it[tag] = "tag1"
                it[description] = "task three"
                it[numberOfPomidors] = 2
                it[userId] = 1
            }
            ActiveTasks.insert {
                it[tag] = "tag2"
                it[description] = "task four"
                it[numberOfPomidors] = 1
                it[userId] = 2
            }
        }
    }

    private fun hikari(): HikariDataSource {
        val config = HikariConfig()
        config.driverClassName = "org.h2.Driver"
        config.jdbcUrl = "jdbc:h2:mem:test"
        config.maximumPoolSize = 3
        config.isAutoCommit = false
        config.transactionIsolation = "TRANSACTION_REPEATABLE_READ"
        config.validate()
        return HikariDataSource(config)
    }

    suspend fun <T> dbQuery(block: () -> T): T =
        withContext(Dispatchers.IO) {
            transaction { block() }
        }
}