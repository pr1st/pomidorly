package routes

import io.ktor.routing.Route
import services.ActiveTasksService
import services.HistoryTasksService
import services.TimersService
import services.UsersService

fun Route.pomidorly(
    activeTasksService: ActiveTasksService,
    historyTasksService: HistoryTasksService,
    usersService: UsersService,
    timersService: TimersService
) {

    activeTasks(activeTasksService)
    historyTasks(historyTasksService)
    users(usersService, timersService)
    timers(timersService)

}
