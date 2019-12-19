package common

import DatabaseFactory
import io.ktor.application.Application
import io.ktor.server.engine.ApplicationEngine
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.restassured.RestAssured
import io.restassured.parsing.Parser
import io.restassured.response.ResponseBodyExtractionOptions
import io.restassured.specification.RequestSpecification
import kotlinx.coroutines.runBlocking
import mainModule
import model.ActiveTasks
import model.HistoryTasks
import model.Timers
import model.Users
import org.jetbrains.exposed.sql.deleteAll
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import java.util.concurrent.TimeUnit

open class ServerTest {

    protected fun RequestSpecification.When(): RequestSpecification {
        return this.`when`()
    }

    protected inline fun <reified T> ResponseBodyExtractionOptions.to(): T {
        return this.`as`(T::class.java)
    }

    companion object {

        private var serverStarted = false
        private lateinit var server: ApplicationEngine

        @BeforeAll
        @JvmStatic
        fun startServer() {
            if (!serverStarted) {
                RestAssured.defaultParser = Parser.JSON

                DatabaseFactory.init()

                server = embeddedServer(Netty, 3503, module = Application::mainModule)
                server.start()
                serverStarted = true

                RestAssured.baseURI = "http://localhost/api/v1"
                RestAssured.port = 3503
                Runtime.getRuntime().addShutdownHook(Thread { server.stop(0, 0, TimeUnit.SECONDS) })
            }
        }
    }

    @BeforeEach
    fun before() = runBlocking {
        newSuspendedTransaction {
            ActiveTasks.deleteAll()
            HistoryTasks.deleteAll()
            Timers.deleteAll()
            Users.deleteAll()
            Unit
        }
    }

}