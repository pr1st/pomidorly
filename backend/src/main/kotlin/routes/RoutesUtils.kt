package routes

import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.header
import io.ktor.response.respond
import model.User
import services.UsersService

object RoutesUtils {

    private val usersService = UsersService()

    suspend fun withUser(call: ApplicationCall, block: suspend (user: User) -> Unit) {
        val token = call.request.header("Token")
        if (token == null) {
            call.respond(HttpStatusCode.BadRequest)
            return
        }
        val user = usersService.getUser(token)
        if (user == null) call.respond(HttpStatusCode.Unauthorized)
        else block(user)
    }

    suspend fun withUserId(call: ApplicationCall, block: suspend (userId: Int) -> Unit) {
        withUser(call) { user -> block(user.id) }
    }

}