package routes

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import model.HistoryTaskDTO
import model.toDTO
import services.HistoryTasksService

fun Route.historyTasks(historyTasksService: HistoryTasksService) {
    route("api/v1/history/tasks") {

        get("/") {
            RoutesUtils.withUserId(call) { userId ->
                call.respond(HttpStatusCode.OK, historyTasksService.getAllTasks(userId).map { it.toDTO() })
            }
        }

        post("/") {
            RoutesUtils.withUserId(call) { userId ->
                val task = call.receive<HistoryTaskDTO>()
                val addedTask = historyTasksService.addTask(task, userId)
                call.respond(HttpStatusCode.Created, addedTask.toDTO())
            }
        }

        delete("/{id}") {
            RoutesUtils.withUserId(call) { userId ->
                RoutesUtils.withTaskId(call) { taskId ->
                    val removed = historyTasksService.deleteTask(taskId, userId)
                    if (removed) call.respond(HttpStatusCode.NoContent)
                    else call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }

}
