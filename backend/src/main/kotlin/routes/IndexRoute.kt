package routes

import io.ktor.application.ApplicationCall
import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.response.respondFile
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.util.pipeline.PipelineContext
import model.toDTO
import java.lang.IllegalStateException
import java.net.URL
import java.nio.file.Paths

fun Route.index() {
    get("") {
        val url = this::class.java.classLoader.getResource("frontend-build/index.html");
        call.respondFile(Paths.get(url!!.toURI()).toFile())
    }

}
