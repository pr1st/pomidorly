package res

import io.ktor.routing.Route
import services.ActiveTasksService
import services.HistoryTasksService

fun Route.pomidorly(
    activeTasksService: ActiveTasksService,
    historyTasksService: HistoryTasksService
) {

    activeTasks(activeTasksService)
    historyTasks(historyTasksService)

}
