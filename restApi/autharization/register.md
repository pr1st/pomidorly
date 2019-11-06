# Registration POST

Registrates a user

* **URL**

  `/api/v1/registrate`

* **Method**

  `POST`

* **Request Headers**

  Content-Type: `application/json`

* **Response Headers(if success response)**

  `No headers`

* **Data Params**

    ```json
    {
        "login": "userName",
        "password": "password"
    }
    ```

* **Success Response**

  * **Code:** 200 OK
  **Content**

  `No body`

* **Error Response**
  
  * **Code:** 409 CONFLICT
  **Cause:** `if user with this name already exists`

  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
