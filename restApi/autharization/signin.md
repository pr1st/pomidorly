# Authorication POST

Get tokens from server

* **URL**

  `/api/v1/auth/signin`

* **Method**

  `POST`

* **Request Headers**

  Accept: `application/json`

  Content-Type: `application/json`

* **Response Headers(if success response)**

  Content-Type: `application/json`

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

      ```json
    {
        "token": "asfjakfajfjfkalf",
        "expiresIn": 3600
    }
    ```

* **Error Response**

  * **Code:** 404 NOT FOUND  
  **Cause:** `if combination login/password is not correct`

  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
