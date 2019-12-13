package res

import io.ktor.routing.Route
import services.ActiveTasksService

fun Route.pomidorly(activeTasksService: ActiveTasksService) {

    activeTasks(activeTasksService)

}
