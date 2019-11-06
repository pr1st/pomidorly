# Refresh token POST

Refresh token

* **URL**

  `/api/v1/auth/refresh`

* **Method**

  `POST`

* **Request Headers**

  Refresh-Token: `segsdfgsdfgsdfggfgf...`

* **Response Headers(if success response)**

  Access-Token: `JhbGciOiJIUzI1NiIsI...`

  Refresh-Token: `7E2cBab30RMHrH...`

* **Success Response**

  * **Code:** 200 OK
  **Content**

  `No body`

* **Error Response**

  * **Code:** 401 UNAUTHORIZED  
  **Cause:** `if given token is not viable`

  * **Code:** 400 BAD REQUEST  
  **Cause:** `if given fields in data params are not correct`
