package web

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import model.NewTask
import service.PomidorlyService

fun Route.pomidorly(pomidorlyService: PomidorlyService) {

    route("api/v1/tasks") {

        get("/") {
            call.respond(pomidorlyService.getAllTasks())
        }

        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalStateException("Must provide id")
            val task = pomidorlyService.getTask(id)
            if (task == null) call.respond(HttpStatusCode.NotFound)
            else call.respond(task)
        }

        post("/") {
            val task = call.receive<NewTask>()
            call.respond(HttpStatusCode.Created, pomidorlyService.addTask(task))
        }

        put("/") {
            val widget = call.receive<NewTask>()
            val updated = pomidorlyService.updateTask(widget)
            if (updated == null) call.respond(HttpStatusCode.NotFound)
            else call.respond(HttpStatusCode.OK, updated)
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalStateException("Must provide id")
            val removed = pomidorlyService.deleteTask(id)
            if (removed) call.respond(HttpStatusCode.OK)
            else call.respond(HttpStatusCode.NotFound)
        }

    }

}
