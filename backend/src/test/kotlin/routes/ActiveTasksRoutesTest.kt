package routes

import common.ServerTest
import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
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
            given()
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
            given()
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

    @Test
    fun getAllTasksTest() {
        withToken("Bob", "qwerty") { token ->
            val task1 = ActiveTaskDTO(null, "tag1", "desc1", 2, null)
            val task2 = ActiveTaskDTO(null, "tag2", "desc2", 4, null)
            val created1 = addActiveTask(task1, token)
            val created2 = addActiveTask(task2, token)

            val allTasks = given()
                .header("Token", token)
                .accept(ContentType.JSON)
                .`when`()
                .get("/current/tasks")
                .then()
                .contentType(ContentType.JSON)
                .statusCode(HttpStatusCode.OK.value)
                .extract().to<Array<ActiveTaskDTO>>()

            assertThat(setOf(created1, created2)).isEqualTo(allTasks.toSet())
        }
    }

    @Test
    fun updateTaskTest() {
        withToken("Bob", "qwerty") { token ->
            val task = ActiveTaskDTO(null, "tag1", "desc1", 2, null)
            val current = addActiveTask(task, token)
            val taskForUpdate = ActiveTaskDTO(null, "tag_new", "desc_new", 3, null)

            given()
                .header("Token", token)
                .contentType(ContentType.JSON)
                .body(taskForUpdate)
                .`when`()
                .put("/current/tasks/{id}", current.id!!)
                .then()
                .statusCode(HttpStatusCode.NoContent.value)

            val updatedTask = getActiveTask(current.id!!, token)

            assertThat(taskForUpdate.tag).isEqualTo(updatedTask.tag)
            assertThat(taskForUpdate.description).isEqualTo(updatedTask.description)
            assertThat(taskForUpdate.numberOfPomidors).isEqualTo(updatedTask.numberOfPomidors)
        }
    }

    @Test
    fun updateTaskWithInvalidIdTest() {
        withToken("Bob", "qwerty") { token ->
            val task = ActiveTaskDTO(null, "tag1", "desc1", 2, null)
            addActiveTask(task, token)
            val taskForUpdate = ActiveTaskDTO(null, "tag_new", "desc_new", 3, null)
            val invalidId = 12345

            given()
                .header("Token", token)
                .contentType(ContentType.JSON)
                .body(taskForUpdate)
                .`when`()
                .put("/current/tasks/{id}", invalidId)
                .then()
                .statusCode(HttpStatusCode.NotFound.value)
        }
    }

}