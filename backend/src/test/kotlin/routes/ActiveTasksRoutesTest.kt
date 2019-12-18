package routes

import common.ServerTest
import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured
import io.restassured.http.ContentType
import model.ActiveTaskDTO
import model.TimerDTO
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import routes.RoutesTestUtils.addActiveTask
import routes.RoutesTestUtils.getActiveTask
import routes.RoutesTestUtils.withToken

class ActiveTasksRoutesTest : ServerTest() {

    @Test
    fun addActiveTaskTest() {
        withToken("Bob", "qwerty") { token ->
            val task = ActiveTaskDTO(null, "tag1", "desc1", 4, null)
            val created = addActiveTask(task, token)
            val retrieved = getActiveTask(created.id!!, token)

            assertThat(created.tag).isEqualTo(task.tag)
            assertThat(created.description).isEqualTo(task.description)
            assertThat(created.numberOfPomidors).isEqualTo(task.numberOfPomidors)

            assertThat(created).isEqualTo(retrieved)
        }
    }

    @Test
    fun addActiveTaskWithInvalidTokenTest() {
        withToken("Bob", "qwerty") { token ->
            val invalidToken = token + "abracadabra"
            val task = ActiveTaskDTO(null, "tag1", "desc1", 4, null)
            RestAssured.given()
                .header("Token", invalidToken)
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(task)
                .`when`()
                .post("/current/tasks")
                .then()
                .statusCode(HttpStatusCode.Unauthorized.value)
        }
    }

    @Test
    fun addActiveTaskWithInvalidDataFieldsTest() {
        withToken("Bob", "qwerty") { token ->
            val invalidTask = TimerDTO(25, 5, 15, 4, true)
            RestAssured.given()
                .header("Token", token)
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(invalidTask)
                .`when`()
                .post("/current/tasks")
                .then()
                .statusCode(HttpStatusCode.BadRequest.value)
        }
    }

}