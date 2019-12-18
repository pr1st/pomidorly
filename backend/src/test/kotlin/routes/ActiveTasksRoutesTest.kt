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
                .When()
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
                .When()
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
            val addedTask1 = addActiveTask(task1, token)
            val addedTask2 = addActiveTask(task2, token)

            val allTasks = given()
                .header("Token", token)
                .accept(ContentType.JSON)
                .When()
                .get("/current/tasks")
                .then()
                .contentType(ContentType.JSON)
                .statusCode(HttpStatusCode.OK.value)
                .extract().to<Array<ActiveTaskDTO>>()

            assertThat(setOf(addedTask1, addedTask2)).isEqualTo(allTasks.toSet())
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
                .When()
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
                .When()
                .put("/current/tasks/{id}", invalidId)
                .then()
                .statusCode(HttpStatusCode.NotFound.value)
        }
    }

    @Test
    fun deleteTaskTest() {
        withToken("Bob", "qwerty") { token ->
            val task = ActiveTaskDTO(null, "tag1", "desc1", 2, null)
            val taskId = addActiveTask(task, token).id!!

            given()
                .header("Token", token)
                .When()
                .delete("/current/tasks/{id}", taskId)
                .then()
                .statusCode(HttpStatusCode.NoContent.value)

            given()
                .header("Token", token)
                .accept(ContentType.JSON)
                .When()
                .get("/current/tasks/{id}", taskId)
                .then()
                .statusCode(HttpStatusCode.NotFound.value)
        }
    }

    @Test
    fun deleteTaskWithInvalidIdTest() {
        withToken("Bob", "qwerty") { token ->
            val task = ActiveTaskDTO(null, "tag1", "desc1", 2, null)
            addActiveTask(task, token)
            val invalidTaskId = 12345

            given()
                .header("Token", token)
                .When()
                .delete("/current/tasks/{id}", invalidTaskId)
                .then()
                .statusCode(HttpStatusCode.NotFound.value)
        }
    }

    @Test
    fun swapTasksTest() {
        withToken("Bob", "qwerty") { token ->
            val task1 = ActiveTaskDTO(null, "tag1", "desc1", 2, null)
            val task2 = ActiveTaskDTO(null, "tag2", "desc2", 4, null)
            val addedTask1 = addActiveTask(task1, token)
            val addedTask2 = addActiveTask(task2, token)

            given()
                .header("Token", token)
                .When()
                .post("/current/tasks/swap/{id1}/{id2}", addedTask1.id!!, addedTask2.id!!)
                .then()
                .statusCode(HttpStatusCode.NoContent.value)

            val updatedTask1 = getActiveTask(addedTask1.id!!, token)
            val updatedTask2 = getActiveTask(addedTask2.id!!, token)

            assertThat(updatedTask1.tag).isEqualTo(addedTask1.tag)
            assertThat(updatedTask1.description).isEqualTo(addedTask1.description)
            assertThat(updatedTask1.numberOfPomidors).isEqualTo(addedTask1.numberOfPomidors)
            assertThat(updatedTask1.inQueue).isEqualTo(addedTask2.inQueue)

            assertThat(updatedTask2.tag).isEqualTo(addedTask2.tag)
            assertThat(updatedTask2.description).isEqualTo(addedTask2.description)
            assertThat(updatedTask2.numberOfPomidors).isEqualTo(addedTask2.numberOfPomidors)
            assertThat(updatedTask2.inQueue).isEqualTo(addedTask1.inQueue)
        }
    }

    @Test
    fun swapTasksWithInvalidIdTest() {
        withToken("Bob", "qwerty") { token ->
            val task1 = ActiveTaskDTO(null, "tag1", "desc1", 2, null)
            val task2 = ActiveTaskDTO(null, "tag2", "desc2", 4, null)
            addActiveTask(task1, token)
            addActiveTask(task2, token)

            given()
                .header("Token", token)
                .When()
                .post("/current/tasks/swap/{id1}/{id2}", 1234, 5678)
                .then()
                .statusCode(HttpStatusCode.NotFound.value)
        }
    }
}

