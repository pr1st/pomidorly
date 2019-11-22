# Current tasks POST

Creates a new task

Puts it at the end of a queue

Data param "numberOfPomidors" positive integer value

* **URL**

  `/api/v1/current/tasks`

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
        "numberOfPomidors": 3
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
