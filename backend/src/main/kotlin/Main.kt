import com.fasterxml.jackson.databind.SerializationFeature
import io.ktor.application.*
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.jackson.jackson
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import service.DatabaseFactory
import service.PomidorlyService
import web.pomidorly

fun Application.mainModule() {
    install(DefaultHeaders)
    install(CallLogging)
    install(ContentNegotiation) {
        jackson {
            configure(SerializationFeature.INDENT_OUTPUT, true)
        }
    }

    routing {
        pomidorly(PomidorlyService())
    }
}

fun main() {
    DatabaseFactory.init()
    embeddedServer(Netty, port = 8080, module = Application::mainModule).start(wait = true)
}
