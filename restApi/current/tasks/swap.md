# Current tasks Post swap method

Swaps 2 tasks places in queue with ids: id1, id2

* **URL**

  `/api/v1/current/tasks/swap/{id1}/{id2}`

* **Method**

  `POST`

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
