# Current tasks PUT

Updates task for this entity with given id

Data param "numberOfPomidors" positive integer value

* **URL**

  `/api/v1/current/tasks/{id}`

* **Method**

  `PUT`

* **Request Headers**
  
  Token: `eyJhbGciOiJIUzI1NiIs`

  Content-Type: `application/json`

* **Response Headers**

  `No headers`

* **Data Params**

     ```json
     {
         "tag": "newCustomTag",
         "description": "newCustomDesc1",
         "numberOfPomidors": 1234
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

  * **Code:** 404 NOT FOUND  
  **Cause:** `if entity with this id does not exists`
