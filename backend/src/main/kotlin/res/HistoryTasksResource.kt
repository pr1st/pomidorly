package res

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import model.HistoryTaskDTO
import services.HistoryTasksService

fun Route.historyTasks(historyTasksService: HistoryTasksService) {
    route("api/v1/history/tasks") {

        get("/") {
            ResourcesUtil.withUserId(call) { uid ->
                call.respond(historyTasksService.getAllTasks(uid))
            }
        }

        post("/") {
            ResourcesUtil.withUserId(call) { uid ->
                val task = call.receive<HistoryTaskDTO>()
                historyTasksService.addTask(task, uid)
                call.respond(HttpStatusCode.Created)
            }
        }

        delete("/{id}") {
            ResourcesUtil.withUserId(call) { userId ->
                val taskId = call.parameters["id"]?.toInt()
                if (taskId == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@withUserId
                }
                val removed = historyTasksService.deleteTask(taskId, userId)
                if (removed) call.respond(HttpStatusCode.NoContent)
                else call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}
