package common

import model.ActiveTasks
import model.Users
import org.jetbrains.exposed.sql.deleteAll
import org.jetbrains.exposed.sql.insert

fun deleteAllData() {
    ActiveTasks.deleteAll()
//    HistoryTasks.deleteAll()
//    Timers.deleteAll()
    Users.deleteAll()
}

fun initTestData() {
    Users.insert {
        it[username] = "Jack"
        it[password] = "ABBA"
    }
    Users.insert {
        it[username] = "Egor Letov"
        it[password] = "GROB"
    }
    ActiveTasks.insert {
        it[tag] = "tag1"
        it[description] = "task one"
        it[numberOfPomidors] = 3
        it[userId] = 1
    }
    ActiveTasks.insert {
        it[tag] = "tag1"
        it[description] = "task two"
        it[numberOfPomidors] = 10
        it[userId] = 2
    }
    ActiveTasks.insert {
        it[tag] = "tag1"
        it[description] = "task three"
        it[numberOfPomidors] = 2
        it[userId] = 1
    }
    ActiveTasks.insert {
        it[tag] = "tag2"
        it[description] = "task four"
        it[numberOfPomidors] = 1
        it[userId] = 2
    }
}