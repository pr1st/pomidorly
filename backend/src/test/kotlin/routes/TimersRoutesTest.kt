package routes

import common.ServerTest
import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.TimerDTO
import model.UserDTO
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import routes.RoutesTestUtils.getTimer
import routes.RoutesTestUtils.updateTimer
import routes.RoutesTestUtils.withToken

class TimersRoutesTest : ServerTest() {
    @Test
    fun getDefaultTimerTest() {
        withToken("Bob", "qwerty") { token ->
            val timer = getTimer(token)
            assertThat(timer.pomidorDuration).isEqualTo(25)
            assertThat(timer.shortBreakDuration).isEqualTo(5)
            assertThat(timer.longBreakDuration).isEqualTo(15)
            assertThat(timer.numberOfPomidorsBeforeLongBreak).isEqualTo(4)
            assertThat(timer.alarmWhenZero).isEqualTo(true)
        }
    }

    @Test
    fun updateTimerTest() {
        withToken("Bob", "qwerty") { token ->
            val newTimer = TimerDTO(30, 10, 20, 3, false)
            updateTimer(newTimer, token)
            val retrieved = getTimer(token)

            assertThat(newTimer.pomidorDuration).isEqualTo(retrieved.pomidorDuration)
            assertThat(newTimer.shortBreakDuration).isEqualTo(retrieved.shortBreakDuration)
            assertThat(newTimer.longBreakDuration).isEqualTo(retrieved.longBreakDuration)
            assertThat(newTimer.numberOfPomidorsBeforeLongBreak).isEqualTo(retrieved.numberOfPomidorsBeforeLongBreak)
            assertThat(newTimer.alarmWhenZero).isEqualTo(retrieved.alarmWhenZero)
        }
    }

    @Test
    fun updateTimerWithInvalidDataFieldsTest() {
        withToken("Bob", "qwerty") { token ->
            val invalidTimer = UserDTO("Invalid", "Data")
            given()
                .header("Token", token)
                .contentType(ContentType.JSON)
                .body(invalidTimer)
                .`when`()
                .put("/timer")
                .then()
                .statusCode(HttpStatusCode.BadRequest.value)
        }
    }
}