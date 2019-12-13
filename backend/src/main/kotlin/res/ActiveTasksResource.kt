package res

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import model.ActiveTaskDTO
import res.ResourcesUtil.withUserId
import res.ResourcesUtil.withUserIdAndTaskId
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
                call.respond(HttpStatusCode.Created) // TODO check response
            }
        }

        put("/{id}") {
            withUserIdAndTaskId(call) { uid, tid ->
                val task = call.receive<ActiveTaskDTO>()
                val updated = activeTasksService.updateTask(tid, task, uid)
                if (updated == null) call.respond(HttpStatusCode.NotFound)
                else call.respond(HttpStatusCode.NoContent)
            }
        }

        delete("/{id}") {
            withUserIdAndTaskId(call) { uid, tid ->
                val removed = activeTasksService.deleteTask(tid, uid)
                if (removed) call.respond(HttpStatusCode.OK)
                else call.respond(HttpStatusCode.NotFound)

            }
        }
    }
}
