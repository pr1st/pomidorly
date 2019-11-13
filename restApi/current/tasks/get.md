# Current tasks GET

Returns a list of all current tasks

* **URL**

  `/api/v1/current/tasks`

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
            "inQueue": 1
        },{
            "id": 2,
            "tag": "customTag",
            "description": "customDesc2",
            "numberOfPomidors": 4,
            "inQueue": 2
        }
    ]
    ```

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`
