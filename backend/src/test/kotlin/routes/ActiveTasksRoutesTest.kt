package routes

import common.ServerTest
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.ActiveTaskDTO
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class ActiveTasksRoutesTest : ServerTest() {

    @Test
    fun testCreateActiveTask() {
        // when
        val newTask = ActiveTaskDTO(null, "tag1", "desc1", 4, null)
        val created = addActiveTask("GROB", newTask)

        val retrieved = getActiveTask("GROB", created.id!!)

        // then
        assertThat(created.tag).isEqualTo(newTask.tag)
        assertThat(created.description).isEqualTo(newTask.description)
        assertThat(created.numberOfPomidors).isEqualTo(newTask.numberOfPomidors)

        assertThat(created).isEqualTo(retrieved)
    }

    private fun addActiveTask(token: String, task: ActiveTaskDTO): ActiveTaskDTO = given()
        .contentType(ContentType.JSON)
        .header("Token", token)
        .body(task)
        .When()
        .post("/current/tasks")
        .then()
        .extract().to()

    private fun getActiveTask(token: String, taskId: Int): ActiveTaskDTO = given()
        .contentType(ContentType.JSON)
        .header("Token", token)
        .When()
        .get("/current/tasks/{id}", taskId)
        .then()
        .extract().to()

}