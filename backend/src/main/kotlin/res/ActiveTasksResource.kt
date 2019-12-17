package res

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import model.ActiveTaskDTO
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
                val taskId = call.parameters["id"]?.toInt()
                if (taskId == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@withUserId
                }
                val task = call.receive<ActiveTaskDTO>()
                val updated = activeTasksService.updateTask(taskId, task, userId)
                if (updated == null) call.respond(HttpStatusCode.NotFound)
                else call.respond(HttpStatusCode.NoContent)
            }
        }

        delete("/{id}") {
            withUserId(call) { userId ->
                val taskId = call.parameters["id"]?.toInt()
                if (taskId == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@withUserId
                }
                val removed = activeTasksService.deleteTask(taskId, userId)
                if (removed) call.respond(HttpStatusCode.NoContent)
                else call.respond(HttpStatusCode.NotFound)
            }
        }

        post("/swap/{id1}/{id2}") {
            withUserId(call) { userId ->
                val taskId1 = call.parameters["id1"]?.toInt()
                val taskId2 = call.parameters["id2"]?.toInt()
                if (taskId1 == null || taskId2 == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@withUserId
                }

                val task1 = activeTasksService.getTask(taskId1, userId)
                val task2 = activeTasksService.getTask(taskId2, userId)
                if (task1 == null || task2 == null) {
                    call.respond(HttpStatusCode.NotFound)
                    return@withUserId
                }

                activeTasksService.updateQueueNumber(taskId1, task2.inQueue!!, userId)
                activeTasksService.updateQueueNumber(taskId2, task1.inQueue!!, userId)
                call.respond(HttpStatusCode.NoContent)
            }
        }
    }
}
