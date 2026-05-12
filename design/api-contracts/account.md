# Account API Contracts

# Get Account Information

## Endpoint

`GET /account`

---

## Description

Get current account information.

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
  "message": "Account information fetched successfully",
  "data": {
    "id": 1,
    "username": "zesk",
    "email": "zesk@example.com",
    "avatar_url": "https://example.com/avatar.png",
    "hobbies": ["GAME", "MUSIC"],
    "birthdate": "2005-09-25"
  }
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

# Change Basic Information

## Endpoint

`PATCH /account`

---

## Description

Update account basic information.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Request Body

| Field      | Type             | Required | Rules                             |
| ---------- | ---------------- | -------- | --------------------------------- |
| username   | string           | No       | min 3, max 50 characters          |
| avatar_url | string           | No       | must be valid image URL           |
| hobbies    | array of strings | No       | must be hobbies Enum              |
| birthdate  | string           | No       | must be valid date (`YYYY-MM-DD`) |

---

## Example Request

```json
{
  "username": "zesk_dev",
  "avatar_url": "https://example.com/avatar.png",
  "hobbies": ["GAME", "MUSIC"],
  "birthdate": "2005-09-25"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Account information updated successfully"
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

### `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

# Change Password

## Endpoint

`POST /account/change-password`

---

## Description

Change current account password.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Request Body

| Field            | Type   | Required | Rules                     |
| ---------------- | ------ | -------- | ------------------------- |
| old_password     | string | Yes      | min 8, max 64 characters  |
| new_password     | string | Yes      | min 8, max 64 characters  |
| confirm_password | string | Yes      | must match `new_password` |

---

## Example Request

```json
{
  "old_password": "oldpassword123",
  "new_password": "newpassword123",
  "confirm_password": "newpassword123"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Password changed successfully"
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

### `401 Unauthorized`

```json
{
  "message": "Old password is incorrect"
}
```

---

# Request Delete Account

## Endpoint

`POST /account/request-delete`

---

## Description

Send account deletion verification code to user email.

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
  "message": "Delete account verification code sent successfully"
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

### `429 Too Many Requests`

```json
{
  "message": "Too many requests. Please try again later."
}
```

---

# Delete Account

## Endpoint

`DELETE /account`

---

## Description

Delete current account permanently.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Request Body

| Field | Type   | Required | Rules                     |
| ----- | ------ | -------- | ------------------------- |
| email | string | Yes      | must be valid email       |
| code  | string | Yes      | must be valid verify code |

---

## Example Request

```json
{
  "email": "zesk@example.com",
  "code": "123456"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Account deleted successfully"
}
```

---

## Error Responses

### `400 Bad Request`

```json
{
  "message": "Invalid verification code"
}
```

### `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

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

---

## `401 Unauthorized`

Authentication failed.

```json
{
  "message": "Unauthorized"
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

| Endpoint                          | Possible Errors      |
| --------------------------------- | -------------------- |
| GET `/account`                    | 401, 500             |
| PATCH `/account`                  | 400, 401, 500        |
| POST `/account/change-password`   | 400, 401, 500        |
| POST `/account/request-delete`    | 401, 429, 500        |
| DELETE `/account`                 | 400, 401, 500        |