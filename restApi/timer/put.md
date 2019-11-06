# Timer config  PUT

Set timer config for user

* **URL**

  `/api/v1/timer`

* **Method**

  `PUT`

* **Request Headers**

    Content-Type: `application/json`

    Token: `eyJhbGciOiJIUzI1NiIs`

* **Response Headers**

  `No headers`

* **Data Params**

    ```json
    {
        "pomidorDuration": 25,
        "shortBreakDuration": 5,
        "longBreakDuration": 15,
        "numberOfPomidorsBeforeLongBreak": 4,
        "alarmWhenZero": false
    }
    ```

* **Success Response**

  * **Code:** 204  NO CONTENT  
  **Content**

    `No body`

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`

  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
