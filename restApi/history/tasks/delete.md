# History tasks DELETE

Deletes a task for this entity with given id

* **URL**

  `/api/v1/history/tasks/{id}`

* **Method**

  `DELETE`

* **Request Headers**

  Token: `eyJhbGciOiJIUzI1NiIs`

* **Response Headers**

  `No headers`

* **Success Response**

  * **Code:** 204  NO CONTENT  
  **Content**

    `No body`

* **Error Response**
  
  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`

  * **Code:** 404 NOT FOUND  
  **Cause:** `if entity with this id does not exists`
