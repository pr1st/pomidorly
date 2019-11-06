# Authorication POST

Get tokens from server

* **URL**

  `/api/v1/auth`

* **Method**

  `POST`

* **Request Headers**

  Content-Type: `application/json`

* **Response Headers(if success response)**

  Access-Token: `JhbGciOiJIUzI1NiIsI...`

  Refresh-Token: `7E2cBab30RMHrH...`

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

  * **Code:** 404 NOT FOUND  
  **Cause:** `if combination login/password is not correct`

  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
