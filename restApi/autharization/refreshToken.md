# Refresh token POST

Refresh token

* **URL**

  `/api/v1/auth/refresh`

* **Method**

  `POST`

* **Request Headers**

  Token: `segsdfgsdfgsdfggfgf...`

* **Response Headers(if success response)**

   Content-Type: `application/json`

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

  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`
