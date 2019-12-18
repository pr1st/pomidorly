import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.SerializationFeature
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.jackson
import io.ktor.response.respond
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import routes.pomidorly
import services.ActiveTasksService
import services.HistoryTasksService
import services.TimersService
import services.UsersService

fun Application.mainModule() {
    install(DefaultHeaders)
    install(CallLogging)
    install(ContentNegotiation) {
        jackson {
            configure(SerializationFeature.INDENT_OUTPUT, true)
        }
    }
    install(StatusPages) {
        exception<JsonProcessingException> {
            call.respond(HttpStatusCode.BadRequest)
        }
        exception<NumberFormatException> {
            call.respond(HttpStatusCode.BadRequest)
        }
    }

    routing {
        pomidorly(
            ActiveTasksService(),
            HistoryTasksService(),
            UsersService(),
            TimersService()
        )
    }
}

fun main() {
    DatabaseFactory.init()
    embeddedServer(Netty, port = 8080, module = Application::mainModule).start(wait = true)
}
