package routes

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.put
import io.ktor.routing.route
import model.TimerDTO
import model.toDTO
import routes.RoutesUtils.withUserId
import services.TimersService

fun Route.timers(timersService: TimersService) {
    route("api/v1/timer/") {

        get {
            withUserId(call) { userId ->
                call.respond(HttpStatusCode.OK, timersService.getTimer(userId)!!.toDTO())
            }
        }

        put {
            withUserId(call) { userId ->
                val timer = call.receive<TimerDTO>()
                timersService.updateTimer(timer, userId)
                call.respond(HttpStatusCode.NoContent)
            }
        }
    }
}
