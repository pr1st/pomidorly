package routes

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.post
import io.ktor.routing.route
import model.TokenDTO
import model.UserDTO
import services.TimersService
import services.UsersService

fun Route.users(
    usersService: UsersService,
    timersService: TimersService
) {
    route("api/v1/auth/") {

        post("/refresh") {
            RoutesUtils.withUser(call) { user ->
                call.respond(HttpStatusCode.OK, TokenDTO(user.password, 3600))
            }
        }

        post("/signup") {
            val user = call.receive<UserDTO>()
            if (usersService.getUser(user.username) != null) {
                call.respond(HttpStatusCode.Conflict)
            } else {
                val addedUser = usersService.addUser(user)
                timersService.addDefaultTimer(addedUser.id)
                call.respond(HttpStatusCode.NoContent)
            }
        }

        post("/signin") {
            val user = call.receive<UserDTO>()
            val userFromDb = usersService.getUser(user.username)
            if (userFromDb != null && user.password == userFromDb.password) {
                call.respond(HttpStatusCode.OK, TokenDTO(user.password, 3600))
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}