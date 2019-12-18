package routes

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import model.ActiveTaskDTO
import model.ActiveTasks
import model.toDTO
import routes.RoutesUtils.withTaskId
import routes.RoutesUtils.withTwoTaskIds
import routes.RoutesUtils.withUserId
import services.ActiveTasksService

fun Route.activeTasks(activeTasksService: ActiveTasksService) {
    route("api/v1/current/tasks") {

        get("/") {
            withUserId(call) { userId ->
                call.respond(HttpStatusCode.OK, activeTasksService.getAllTasks(userId).map { it.toDTO() })
            }
        }

        get("/{id}") {
            withUserId(call) { userId ->
                withTaskId(call) { taskId ->
                    val task = activeTasksService.getTask(taskId, userId)
                    if (task == null) call.respond(HttpStatusCode.NotFound)
                    else call.respond(HttpStatusCode.OK, task.toDTO())
                }
            }
        }

        post("/") {
            withUserId(call) { userId ->
                val task = call.receive<ActiveTaskDTO>()
                val addedTask = activeTasksService.addTask(task, userId)
                call.respond(HttpStatusCode.Created, addedTask.toDTO())
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

        post("/swap/{id1}/{id2}") {
            withUserId(call) { userId ->
                withTwoTaskIds(call) { taskId1, taskId2 ->
                    val task1 = activeTasksService.getTask(taskId1, userId)
                    val task2 = activeTasksService.getTask(taskId2, userId)
                    if (task1 == null || task2 == null) {
                        call.respond(HttpStatusCode.NotFound)
                    } else {
                        activeTasksService.updateField(taskId1, ActiveTasks.inQueue, task2.inQueue, userId)
                        activeTasksService.updateField(taskId2, ActiveTasks.inQueue, task1.inQueue, userId)
                        call.respond(HttpStatusCode.NoContent)
                    }
                }
            }
        }
    }
}
