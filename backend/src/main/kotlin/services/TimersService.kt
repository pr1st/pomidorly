package services

import DatabaseFactory.dbQuery
import model.Timer
import model.TimerDTO
import model.Timers
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.update

class TimersService {

    suspend fun getTimer(userId: Int): Timer? = dbQuery {
        Timers.select {
            (Timers.userId eq userId)
        }.mapNotNull { toTimer(it) }
            .singleOrNull()
    }

    suspend fun updateTimer(timer: TimerDTO, userId: Int) {
        dbQuery {
            Timers.update({ Timers.userId eq userId }) {
                it[pomidorDuration] = timer.pomidorDuration
                it[shortBreakDuration] = timer.shortBreakDuration
                it[longBreakDuration] = timer.longBreakDuration
                it[numberOfPomidorsBeforeLongBreak] = timer.numberOfPomidorsBeforeLongBreak
                it[alarmWhenZero] = timer.alarmWhenZero
            }
        }
    }

    suspend fun addDefaultTimer(userId: Int) {
        dbQuery {
            Timers.insert {
                it[pomidorDuration] = 25
                it[shortBreakDuration] = 5
                it[longBreakDuration] = 15
                it[numberOfPomidorsBeforeLongBreak] = 4
                it[alarmWhenZero] = true
                it[this.userId] = userId
            }
        }
    }

    private fun toTimer(row: ResultRow): Timer =
        Timer(
            id = row[Timers.id],
            pomidorDuration = row[Timers.pomidorDuration],
            shortBreakDuration = row[Timers.shortBreakDuration],
            longBreakDuration = row[Timers.longBreakDuration],
            numberOfPomidorsBeforeLongBreak = row[Timers.numberOfPomidorsBeforeLongBreak],
            alarmWhenZero = row[Timers.alarmWhenZero],
            userId = row[Timers.userId]
        )

}