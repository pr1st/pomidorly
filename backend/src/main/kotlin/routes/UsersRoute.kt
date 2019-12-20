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
                val authorizedUser = usersService.authorizeUser(user.login)
                call.respond(HttpStatusCode.OK, TokenDTO(authorizedUser.token, 55000))
            }
        }

        post("/signup") {
            val user = call.receive<UserDTO>()
            if (usersService.getUser(user.login) != null) {
                call.respond(HttpStatusCode.Conflict)
            } else {
                val addedUser = usersService.addUser(user)
                timersService.addDefaultTimer(addedUser.id)
                call.respond(HttpStatusCode.NoContent)
            }
        }

        post("/signin") {
            val user = call.receive<UserDTO>()
            val userFromDb = usersService.getUser(user.login)
            if (userFromDb != null && user.password == userFromDb.password) {
                val authorizedUser = usersService.authorizeUser(userFromDb.login)
                call.respond(HttpStatusCode.OK, TokenDTO(authorizedUser.token, 55000))
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}
