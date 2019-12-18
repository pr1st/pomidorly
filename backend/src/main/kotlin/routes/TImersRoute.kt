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
import services.TimersService

fun Route.timers(timersService: TimersService) {
    route("api/v1/timer/") {

        get {
            RoutesUtils.withUserId(call) { userId ->
                call.respond(HttpStatusCode.OK, timersService.getTimer(userId)!!.toDTO())
            }
        }

        put {
            RoutesUtils.withUserId(call) { userId ->
                val timer = call.receive<TimerDTO>()
                timersService.updateTimer(timer, userId)
                call.respond(HttpStatusCode.NoContent)
            }
        }
    }
}
