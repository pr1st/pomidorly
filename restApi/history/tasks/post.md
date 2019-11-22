# History tasks POST

Creates a new done task

* **URL**

  `/api/v1/history/tasks`

* **Method**

  `POST`

* **Request Headers**
  
  Token: `eyJhbGciOiJIUzI1NiIs`

  Content-Type: `application/json`

* **Response Headers**

  `No headers`

* **Data Params**

    ```json
    {
        "tag": "customTag",
        "description": "customDesc",
        "timeFinished": 123456
    }
    ```

* **Success Response**

  * **Code:** 201  CREATED  
  **Content**

     `No body`

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`
  
  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
