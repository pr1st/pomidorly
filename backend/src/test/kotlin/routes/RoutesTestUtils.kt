package routes

import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.ActiveTaskDTO
import model.HistoryTaskDTO
import model.TokenDTO
import model.UserDTO

object RoutesTestUtils {

    fun signUp(user: UserDTO) {
        given()
            .contentType(ContentType.JSON)
            .body(user)
            .`when`()
            .post("auth/signup")
            .then()
            .statusCode(HttpStatusCode.NoContent.value)
    }

    fun signIn(user: UserDTO): TokenDTO = given()
        .accept(ContentType.JSON)
        .contentType(ContentType.JSON)
        .body(user)
        .`when`()
        .post("auth/signin")
        .then()
        .statusCode(HttpStatusCode.OK.value)
        .contentType(ContentType.JSON)
        .extract().`as`(TokenDTO::class.java)

    fun addActiveTask(task: ActiveTaskDTO, token: String): ActiveTaskDTO = given()
        .header("Token", token)
        .contentType(ContentType.JSON)
        .accept(ContentType.JSON)
        .body(task)
        .`when`()
        .post("/current/tasks")
        .then()
        .contentType(ContentType.JSON)
        .statusCode(HttpStatusCode.Created.value)
        .extract().`as`(ActiveTaskDTO::class.java)

    fun getActiveTask(taskId: Int, token: String): ActiveTaskDTO = given()
        .header("Token", token)
        .accept(ContentType.JSON)
        .`when`()
        .get("/current/tasks/{id}", taskId)
        .then()
        .contentType(ContentType.JSON)
        .statusCode(HttpStatusCode.OK.value)
        .extract().`as`(ActiveTaskDTO::class.java)

    fun addHistoryTask(task: HistoryTaskDTO, token: String): HistoryTaskDTO = given()
        .header("Token", token)
        .contentType(ContentType.JSON)
        .accept(ContentType.JSON)
        .body(task)
        .`when`()
        .post("/history/tasks")
        .then()
        .contentType(ContentType.JSON)
        .statusCode(HttpStatusCode.Created.value)
        .extract().`as`(HistoryTaskDTO::class.java)

    fun getHistoryTask(taskId: Int, token: String): HistoryTaskDTO = given()
        .header("Token", token)
        .accept(ContentType.JSON)
        .`when`()
        .get("/history/tasks/{id}", taskId)
        .then()
        .contentType(ContentType.JSON)
        .statusCode(HttpStatusCode.OK.value)
        .extract().`as`(HistoryTaskDTO::class.java)

    fun withToken(login: String, password: String, block: (token: String) -> Unit) {
        val user = UserDTO(login, password)
        signUp(user)
        block(signIn(user).token)
    }
}