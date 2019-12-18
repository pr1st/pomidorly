package routes

import common.ServerTest
import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.TimerDTO
import model.TokenDTO
import model.UserDTO
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class UsersRoutesTest : ServerTest() {

    @Test
    fun signUpTest() {
        val user = UserDTO("Bob", "qwerty")
        given()
            .contentType(ContentType.JSON)
            .body(user)
            .When()
            .post("auth/signup")
            .then()
            .statusCode(HttpStatusCode.NoContent.value)
    }

    @Test
    fun signUpWithUsernameConflictTest() {
        val user = UserDTO("Bob", "qwerty")
        RoutesTestUtils.signUp(user)
        val anotherUser = UserDTO("Bob", "12345")
        given()
            .contentType(ContentType.JSON)
            .body(anotherUser)
            .When()
            .post("auth/signup")
            .then()
            .statusCode(HttpStatusCode.Conflict.value)
    }

    @Test
    fun signUpWithIncorrectDataFieldsTest() {
        val invalidUser = TimerDTO(25, 5, 15, 4, true)
        given()
            .contentType(ContentType.JSON)
            .body(invalidUser)
            .When()
            .post("auth/signup")
            .then()
            .statusCode(HttpStatusCode.BadRequest.value)
    }

    @Test
    fun signInTest() {
        val user = UserDTO("Bob", "qwerty")
        RoutesTestUtils.signUp(user)
        val token = given()
            .accept(ContentType.JSON)
            .contentType(ContentType.JSON)
            .body(user)
            .When()
            .post("auth/signin")
            .then()
            .statusCode(HttpStatusCode.OK.value)
            .contentType(ContentType.JSON)
            .extract().to<TokenDTO>()

        assertThat(token.expiresIn > 0)
    }

    @Test
    fun signInWithIncorrectPasswordTest() {
        val user = UserDTO("Bob", "qwerty")
        RoutesTestUtils.signUp(user)
        val invalidUser = UserDTO("Bob", "invalidPassword")
        given()
            .accept(ContentType.JSON)
            .contentType(ContentType.JSON)
            .body(invalidUser)
            .When()
            .post("auth/signin")
            .then()
            .statusCode(HttpStatusCode.NotFound.value)
    }

    @Test
    fun signInWithIncorrectDataFieldsTest() {
        val user = UserDTO("Bob", "qwerty")
        RoutesTestUtils.signUp(user)
        val invalidUser = TimerDTO(25, 5, 15, 4, true)
        given()
            .accept(ContentType.JSON)
            .contentType(ContentType.JSON)
            .body(invalidUser)
            .When()
            .post("auth/signin")
            .then()
            .statusCode(HttpStatusCode.BadRequest.value)
    }

    @Test
    fun refreshTokenTest() {
        val user = UserDTO("Bob", "qwerty")
        RoutesTestUtils.signUp(user)
        val currentToken = RoutesTestUtils.signIn(user).token
        val newToken = given()
            .accept(ContentType.JSON)
            .header("Token", currentToken)
            .When()
            .post("auth/refresh")
            .then()
            .statusCode(HttpStatusCode.OK.value)
            .contentType(ContentType.JSON)
            .extract().to<TokenDTO>()

        assertThat(newToken.expiresIn > 0)
    }

    @Test
    fun refreshTokenWithInvalidTokenTest() {
        val user = UserDTO("Bob", "qwerty")
        RoutesTestUtils.signUp(user)
        val invalidToken = RoutesTestUtils.signIn(user).token + "abracadabra"
        given()
            .accept(ContentType.JSON)
            .header("Token", invalidToken)
            .When()
            .post("auth/refresh")
            .then()
            .statusCode(HttpStatusCode.Unauthorized.value)
    }
}