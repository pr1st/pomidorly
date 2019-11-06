# Timer config GET

Returns timer config of user

* **URL**

  `/api/v1/timer`

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
    {
        "pomidorDuration": 25,
        "shortBreakDuration": 5,
        "longBreakDuration": 15,
        "numberOfPomidorsBeforeLongBreak": 4,
        "alarmWhenZero": false
    }
    ```

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`
