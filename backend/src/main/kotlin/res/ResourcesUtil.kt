package res

import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.header
import io.ktor.response.respond
import services.UsersService

object ResourcesUtil {

    private val usersService = UsersService()

    suspend fun withUserId(call: ApplicationCall, block: suspend (uid: Int) -> Unit) {
        val token = call.request.header("Token")
        if (token == null) {
            call.respond(HttpStatusCode.BadRequest)
            return
        }
        val uid = usersService.getUserId(token)
        if (uid == null) call.respond(HttpStatusCode.Unauthorized)
        else block(uid)
    }
}