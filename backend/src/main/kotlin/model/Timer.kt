package model

import org.jetbrains.exposed.sql.Table

object Timers : Table() {
    val id = ActiveTasks.integer("id").primaryKey().autoIncrement()
    val pomidorDuration = integer("pomidor_duration")
    val shortBreakDuration = integer("short_break_duration")
    val longBreakDuration = integer("long_break_duration")
    val numberOfPomidorsBeforeLongBreak = integer("number_of_pomidors_before_long_break")
    val alarmWhenZero = bool("alarm_when_zero")
    val userId = (integer("user_id") references Users.id).uniqueIndex()
}

data class Timer(
    val id: Int,
    val pomidorDuration: Int,
    val shortBreakDuration: Int,
    val longBreakDuration: Int,
    val numberOfPomidorsBeforeLongBreak: Int,
    val alarmWhenZero: Boolean,
    val userId: Int
)

fun Timer.toDTO() =
    TimerDTO(pomidorDuration, shortBreakDuration, longBreakDuration, numberOfPomidorsBeforeLongBreak, alarmWhenZero)

data class TimerDTO(
    val pomidorDuration: Int,
    val shortBreakDuration: Int,
    val longBreakDuration: Int,
    val numberOfPomidorsBeforeLongBreak: Int,
    val alarmWhenZero: Boolean
)
