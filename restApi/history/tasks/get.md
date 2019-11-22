# History tasks GET

Returns a list of done tasks

Returns no more than count tasks, default (count=+infinity) (as mush as it is possible)

Return tasks starting with task number in startingWith, default (startingWith=0)

count: int, startingWith: int

* **URL**

  `/api/v1/history/tasks[?count=5][?startingWith=2]`

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
