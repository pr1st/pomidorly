package res

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import model.ActiveTaskDTO
import res.ResourcesUtil.withTaskId
import res.ResourcesUtil.withUserId
import services.ActiveTasksService

fun Route.activeTasks(activeTasksService: ActiveTasksService) {
    route("api/v1/current/tasks") {

        get("/") {
            withUserId(call) { uid ->
                call.respond(activeTasksService.getAllTasks(uid))
            }
        }

        post("/") {
            withUserId(call) { uid ->
                val task = call.receive<ActiveTaskDTO>()
                activeTasksService.addTask(task, uid)
                call.respond(HttpStatusCode.Created)
            }
        }

        put("/{id}") {
            withUserId(call) { userId ->
                withTaskId(call) { taskId ->
                    val task = call.receive<ActiveTaskDTO>()
                    val updated = activeTasksService.updateTask(taskId, task, userId)
                    if (updated == null) call.respond(HttpStatusCode.NotFound)
                    else call.respond(HttpStatusCode.NoContent)
                }
            }
        }

        delete("/{id}") {
            withUserId(call) { userId ->
                withTaskId(call) { taskId ->
                    val removed = activeTasksService.deleteTask(taskId, userId)
                    if (removed) call.respond(HttpStatusCode.NoContent)
                    else call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }
}
