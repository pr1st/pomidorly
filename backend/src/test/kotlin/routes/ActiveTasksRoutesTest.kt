package routes

import common.ServerTest
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.ActiveTask
import model.ActiveTaskDTO
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class ActiveTasksRoutesTest : ServerTest() {

    @Test
    fun testCreateActiveTask() {
        // when
        val newActiveTask = ActiveTaskDTO(null, "tag1", "desc1", 4, null)
        val created = addActiveTask(newActiveTask)

        val retrieved = given()
            .contentType(ContentType.JSON)
            .header("Token", "aabb")
            .When()
            .get("/current/tasks/{id}", created.id)
            .then()
            .extract().to<ActiveTaskDTO>()

        // then
        assertThat(created.tag).isEqualTo(newActiveTask.tag)
        assertThat(created.description).isEqualTo(newActiveTask.description)
        assertThat(created.numberOfPomidors).isEqualTo(newActiveTask.numberOfPomidors)

        assertThat(created).isEqualTo(retrieved)
    }

    private fun addActiveTask(task: ActiveTaskDTO): ActiveTask {
        return given()
            .contentType(ContentType.JSON)
            .header("Token", "aaa")
            .body(task)
            .When()
            .post("/current/tasks")
            .then()
            .statusCode(201)
            .extract().to()
    }

}