package routes

import common.ServerTest
import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.HistoryTaskDTO
import model.TimerDTO
import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import routes.RoutesTestUtils.addHistoryTask
import routes.RoutesTestUtils.getHistoryTask
import routes.RoutesTestUtils.withToken

class HistoryTasksRoutesTest : ServerTest() {
    @Test
    fun addHistoryTaskTest() {
        withToken("Bob", "qwerty") { token ->
            val task = HistoryTaskDTO(null, "tag1", "desc1", 1234567890)
            val created = addHistoryTask(task, token)
            val retrieved = getHistoryTask(created.id!!, token)

            Assertions.assertThat(created.tag).isEqualTo(task.tag)
            Assertions.assertThat(created.description).isEqualTo(task.description)
            Assertions.assertThat(created.timeFinished).isEqualTo(task.timeFinished)

            Assertions.assertThat(created).isEqualTo(retrieved)
        }
    }

    @Test
    fun addHistoryTaskWithInvalidTokenTest() {
        withToken("Bob", "qwerty") { token ->
            val invalidToken = token + "abracadabra"
            val task = HistoryTaskDTO(null, "tag1", "desc1", 1234567890)
            given()
                .header("Token", invalidToken)
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(task)
                .When()
                .post("/history/tasks")
                .then()
                .statusCode(HttpStatusCode.Unauthorized.value)
        }
    }

    @Test
    fun addHistoryTaskWithInvalidDataFieldsTest() {
        withToken("Bob", "qwerty") { token ->
            val invalidTask = TimerDTO(25, 5, 15, 4, true)
            given()
                .header("Token", token)
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(invalidTask)
                .When()
                .post("/history/tasks")
                .then()
                .statusCode(HttpStatusCode.BadRequest.value)
        }
    }
}