# History tasks GET

Returns a list of done tasks

Returns no more than count tasks, if count is not set returns as (count=+infinity)

Return tasks which value "timeFinished" are lower or equal than startingWith, if startingWith is not set returns as (startingWith=+infinity)

count: integer, startingWith: long

* **URL**

  `/api/v1/history/tasks[?count=5][?startingWith=3600000]`

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
            "timeFinished": 123456
        },{
            "id": 2,
            "tag": "customTag",
            "description": "customDesc2",
            "timeFinished": 123567
        }
    ]
    ```

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`

  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given params in url are incorrect type`
