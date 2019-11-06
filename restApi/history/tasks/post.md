# History tasks POST

Creates a new done task

* **URL**

  `/api/v1/history/tasks`

* **Method**

  `POST`

* **Request Headers**
  
  Token: `eyJhbGciOiJIUzI1NiIs`

  Content-Type: `application/json`

  Accept: `application/json`

* **Response Headers(if success response)**

  Content-Type: `application/json`

  Location: `api/v1/current/tasks/2`

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

     ```json
    {
        "id": 2, // id should be as in location header
        "tag": "customTag",
        "description": "customDesc",
        "timeFinished": 123456
    }
    ```

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`
  
  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
