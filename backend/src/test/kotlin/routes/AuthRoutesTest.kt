package routes

import common.ServerTest
import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.TimerDTO
import model.UserDTO
import org.junit.jupiter.api.Test

class AuthRoutesTest : ServerTest() {

    @Test
    fun signUpTest() {
        val user = UserDTO("Bob", "qwerty")
        given()
            .contentType(ContentType.JSON)
            .body(user)
            .`when`()
            .post("auth/signup")
            .then()
            .statusCode(HttpStatusCode.NoContent.value)
    }

    @Test
    fun signUpUsernameConflictTest() {
        val user = UserDTO("Bob", "qwerty")
        RoutesTestUtils.addUser(user)
        val anotherUser = UserDTO("Bob", "12345")
        given()
            .contentType(ContentType.JSON)
            .body(anotherUser)
            .`when`()
            .post("auth/signup")
            .then()
            .statusCode(HttpStatusCode.Conflict.value)
    }

    @Test
    fun signUpIncorrectDataFieldsTest() {
        val invalidUserDTO = TimerDTO(25, 5, 15, 4, true)
        given()
            .contentType(ContentType.JSON)
            .body(invalidUserDTO)
            .`when`()
            .post("auth/signup")
            .then()
            .statusCode(HttpStatusCode.BadRequest.value)
    }

}