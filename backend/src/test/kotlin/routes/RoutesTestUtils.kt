package routes

import io.ktor.http.HttpStatusCode
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import model.UserDTO

object RoutesTestUtils {

    fun addUser(user: UserDTO) = given()
        .contentType(ContentType.JSON)
        .body(user)
        .`when`()
        .post("auth/signup")
        .then()
        .statusCode(HttpStatusCode.NoContent.value)

}