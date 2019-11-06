# Current tasks POST

Creates a new task

Puts it at the end of a queue(returns inQueue value that is least among current)

* **URL**

  `/api/v1/current/tasks`

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
        "numberOfPomidors": 3
    }
    ```

* **Success Response**

  * **Code:** 201  CREATED  
  **Content**

     ```json
     {
         "id": 2, // id should be as in location header
         "tag": "customTag",
         "description": "customDesc1",
         "numberOfPomidors": 3,
         "inQueue": 124.3
    }
    ```

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`
  
  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
