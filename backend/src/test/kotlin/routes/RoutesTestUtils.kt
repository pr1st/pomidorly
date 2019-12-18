package routes

import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
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
}