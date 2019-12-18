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
        val user = usersService.getUserByToken(token)
        if (user == null) call.respond(HttpStatusCode.Unauthorized)
        else block(user)
    }

    suspend fun withUserId(call: ApplicationCall, block: suspend (userId: Int) -> Unit) {
        withUser(call) { user -> block(user.id) }
    }

    suspend fun withTaskId(call: ApplicationCall, block: suspend (taskId: Int) -> Unit) {
        withUrlIntParameters(call, listOf("id")) { block(it["id"]!!) }
    }

    suspend fun withTwoTaskIds(call: ApplicationCall, block: suspend (taskId1: Int, taskId2: Int) -> Unit) {
        withUrlIntParameters(call, listOf("id1", "id2")) { block(it["id1"]!!, it["id2"]!!) }
    }

    private suspend fun withUrlIntParameters(
        call: ApplicationCall,
        names: List<String>,
        block: suspend (parameters: Map<String, Int>) -> Unit
    ) {
        val parameters = mutableMapOf<String, Int>()
        names.forEach {
            val value = call.parameters[it]?.toInt()
            if (value == null) {
                call.respond(HttpStatusCode.BadRequest)
                return@withUrlIntParameters
            }
            parameters[it] = value
        }
        block(parameters)
    }

}