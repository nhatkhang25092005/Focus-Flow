# Auth API Contracts

# All urls start with  `/api`

# Login

## Endpoint

`POST /auth/login`

---

## Description

Login use email and password.

---

## Authentication

Not required.

---

## Request Body

| Field    | Type   | Required | Rules              |
| -------- | ------ | -------- | ------------------ |
| email    | string | Yes      | valid email, <=255 |
| password | string | Yes      | 8-64 chars         |

---

## Example Request

```json
{
  "email": "zesk@example.com",
  "password": "12345678"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Login successful",
  "data": {
    "access_token": "jwt_token_here",
    "user": {
      "user_id": 1,
      "username": "zesk",
      "email": "zesk@example.com",
      "hobbies": ["game"],
      "avatar_url": null,
      "birthdate": "2005-09-25"
    }
  }
}
```

---

## Error Responses

### `400 Bad Request`

```json
{
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format"
  }
}
```

### `401 Unauthorized`

```json
{
  "message": "Invalid email or password"
}
```

---

# Register

## Endpoint

`POST /auth/register`

---

## Description

Create new account.

---

## Authentication

Not required.

---

## Request Body

| Field            | Type   | Required | Rules               |
| ---------------- | ------ | -------- | ------------------- |
| username         | string | Yes      | 3-50 chars          |
| email            | string | Yes      | valid email, <=255  |
| password         | string | Yes      | 8-64 chars          |
| confirm_password | string | Yes      | must match password |
| birthdate        | string | No       | format YYYY-MM-DD   |
| hobbies          | array  | No       | array of hobby ids  |

---

## Example Request

```json
{
  "username": "zesk",
  "email": "zesk@example.com",
  "password": "12345678",
  "confirm_password": "12345678",
  "birthdate": "2005-09-25",
  "hobbies": [1, 3]
}
```

---

## Success Response

### `201 Created`

```json
{
  "message": "Register successful",
  "data": {
    "user_id": 1
  }
}
```

---

## Error Responses

### `400 Bad Request`

```json
{
  "message": "Validation error"
}
```

### `409 Conflict`

```json
{
  "message": "Email already exists"
}
```

---

# Forgot Password

## Endpoint

`POST /auth/forgot-password`

---

## Description

Send reset password code to user email.

---

## Authentication

Not required.

---

## Request Body

| Field | Type   | Required | Rules              |
| ----- | ------ | -------- | ------------------ |
| email | string | Yes      | valid email, <=255 |

---

## Example Request

```json
{
  "email": "zesk@example.com"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Reset password code sent successfully"
}
```

---

## Error Responses

### `404 Not Found`

```json
{
  "message": "Email not found"
}
```

---

# Verify Code To Reset Password

## Endpoint

`POST /auth/reset-password`

---

## Description

Verify reset password code and update new password.

---

## Authentication

Not required.

---

## Request Body

| Field            | Type   | Required | Rules               |
| ---------------- | ------ | -------- | ------------------- |
| code             | string | Yes      | exactly 6 chars     |
| new_password     | string | Yes      | 8-64 chars          |
| confirm_password | string | Yes      | must match password |

---

## Example Request

```json
{
  "code": "123456",
  "new_password": "newpassword123",
  "confirm_password": "newpassword123"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Password reset successful"
}
```

---

## Error Responses

### `400 Bad Request`

```json
{
  "message": "Invalid or expired code"
}
```

---

# Logout

## Endpoint

`POST /auth/logout`

---

## Description

Logout current user.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Success Response

### `200 OK`

```json
{
  "message": "Logout successful"
}
```

---

## Error Responses

### `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

# Refresh Token

## Endpoint

`POST /auth/refresh-token`

## Description

Generate a new access token using a valid refresh token.

---

## Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

---

## Request Body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## Success Response

### `200 OK`

```json
{
  "success": true,
  "message": "Refresh token successful",
  "data": {
    "accessToken": "new-access-token",
  }
}
```

---

## Error Responses

### `401 Unauthorized`

```json
{
  "success": false,
  "message": "Invalid or expired refresh token"
}
```

---

### `403 Forbidden`

```json
{
  "success": false,
  "message": "Refresh token revoked"
}
```


# Standard Error Response

```json
{
  "message": "Validation error",
  "errors": {
    "field_name": "error message"
  }
}
```

# Common Error Responses

## `400 Bad Request`

Validation failed.

```json
{
  "message": "Validation error",
  "errors": {
    "field_name": "error message"
  }
}
```

Example:

```json
{
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be 8-64 characters"
  }
}
```

---

## `401 Unauthorized`

Authentication failed.

```json
{
  "message": "Unauthorized"
}
```

Example:

```json
{
  "message": "Invalid email or password"
}
```

---

## `403 Forbidden`

User does not have permission.

```json
{
  "message": "Forbidden"
}
```

---

## `404 Not Found`

Requested resource not found.

```json
{
  "message": "Resource not found"
}
```

Example:

```json
{
  "message": "User not found"
}
```

---

## `409 Conflict`

Data conflict.

```json
{
  "message": "Conflict"
}
```

Example:

```json
{
  "message": "Email already exists"
}
```

---

## `429 Too Many Requests`

Too many requests from client.

```json
{
  "message": "Too many requests. Please try again later."
}
```

---

## `500 Internal Server Error`

Unexpected server error.

```json
{
  "message": "Internal server error"
}
```

---

# Error Usage By Endpoint

| Endpoint                            | Possible Errors                |
| ----------------------------------- | ------------------------------ |
| POST `/auth/login`                  | 400, 401, 429, 500             |
| POST `/auth/register`               | 400, 409, 500                  |
| POST `/auth/forgot-password`        | 400, 404, 429, 500             |
| POST `/auth/reset-password` | 400, 401, 500                  |
| POST `/auth/logout`                 | 401, 500                       |
| DELETE `/auth/delete-account`       | 400, 401, 500                  |