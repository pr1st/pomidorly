# Current tasks GET

Returns a list of current tasks

Returns no more than count tasks (if count is not set returns as (count=+infinity))

Return tasks which value "inQueue" are greater or equal than startingWith (if startingWith is not set returns as (startingWith=-infinity))

count: integer, startingWith: double

* **URL**

  `/api/v1/current/tasks[?count=5][?startingWith=123.123]`

* **Method**

  `GET`

* **Request Headers**

  Accept: `application/json`
  
  Token: `eyJhbGciOiJIUzI1NiIs`

* **Response Headers(if success response)**

  Content-Type: `application/json`

* **Success Response**

  * **Code:** 200  OK  
  **Content:**

    ```json
    [
        {
            "id": 1,
            "tag": "customTag",
            "description": "customDesc1",
            "numberOfPomidors": 3,
            "inQueue": 124
        },{
            "id": 2,
            "tag": "customTag",
            "description": "customDesc2",
            "numberOfPomidors": 4,
            "inQueue": 126
        }
    ]
    ```

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`

  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given params in url are incorrect type`
