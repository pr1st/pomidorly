# Current tasks PUT

Updates all ask for this entity given in body

Doing all changes in one transaction, if one failed, return exception

* **URL**

  `/api/v1/current/tasks`

* **Method**

  `PUT`

* **Request Headers**
  
  Token: `eyJhbGciOiJIUzI1NiIs`

  Content-Type: `application/json`

* **Response Headers**

  `No headers`

* **Data Params**

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
  **Cause:** `if id one of the entity does not exists`
