# Pomodoro API Contracts

# All urls start with  `/api`

# Start Pomodoro

## Endpoint

`POST /pomodoro-sessions`

---

## Description

Start a new pomodoro session.

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

| Field      | Type   | Required | Rules                   |
| ---------- | ------ | -------- | ----------------------- |
| started_at | string | Yes      | must be valid timestamp |

---

## Example Request

```json
{
  "started_at": "2026-05-11T09:00:00Z"
}
```

---

## Success Response

### `201 Created`

```json
{
  "message": "Pomodoro session started successfully",
  "data": {
    "pomodoro_id": 1,
    "status": "RUNNING",
    "started_at": "2026-05-11T09:00:00Z"
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
    "started_at": "Invalid timestamp format"
  }
}
```

### `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

# Auto Save Pomodoro

## Endpoint

`PATCH /pomodoro-sessions/{pomodoro_id}`

---

## Description

Auto save current pomodoro progress.

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

| Field            | Type   | Required | Rules                              |
| ---------------- | ------ | -------- | ---------------------------------- |
| duration_seconds | number | Yes      | must be greater than or equal to 0 |

---

## Example Request

```json
{
  "duration_seconds": 1200
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Pomodoro session auto saved successfully"
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

### `404 Not Found`

```json
{
  "message": "Pomodoro session not found"
}
```

---

# Save Pomodoro

## Endpoint

`PATCH /pomodoro-sessions/{pomodoro_id}`

---

## Description

Complete and save pomodoro session.

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

| Field            | Type   | Required | Rules                              |
| ---------------- | ------ | -------- | ---------------------------------- |
| duration_seconds | number | Yes      | must be greater than or equal to 0 |
| ended_at         | string | Yes      | must be valid timestamp            |
| status           | string | Yes      | must be `COMPLETED`                |

---

## Example Request

```json
{
  "duration_seconds": 1500,
  "ended_at": "2026-05-11T09:25:00Z",
  "status": "COMPLETED"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Pomodoro session completed successfully"
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

### `404 Not Found`

```json
{
  "message": "Pomodoro session not found"
}
```

---

# Pause Pomodoro

## Endpoint

`PATCH /pomodoro-sessions/{pomodoro_id}`

---

## Description

Pause current pomodoro session.

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

| Field            | Type   | Required | Rules                              |
| ---------------- | ------ | -------- | ---------------------------------- |
| duration_seconds | number | Yes      | must be greater than or equal to 0 |
| ended_at         | string | Yes      | must be valid timestamp            |
| status           | string | Yes      | must be `PAUSED`              |

---

## Example Request

```json
{
  "duration_seconds": 600,
  "ended_at": "2026-05-11T09:10:00Z",
  "status": "PAUSED"
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Pomodoro session paused successfully"
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

### `404 Not Found`

```json
{
  "message": "Pomodoro session not found"
}
```

---

# Get Pomodoro Sessions History

## Endpoint

`GET /pomodoro-sessions?cursor={cursor}&limit={limit}`

---

## Description

Get pomodoro sessions history with cursor pagination.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Query Parameters

| Field  | Type   | Required | Rules                                            |
| ------ | ------ | -------- | ------------------------------------------------ |
| cursor | string | No       | must be valid cursor                             |
| limit  | number | No       | default 20, max 100                              |

---

## Example Request

`GET /pomodoro-sessions?limit=20`

---

## Success Response

### `200 OK`

```json
{
  "message": "Pomodoro sessions fetched successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "duration_seconds": 1500,
        "status": "COMPLETED",
        "started_at": "2026-05-11T09:00:00Z",
        "ended_at": "2026-05-11T09:25:00Z"
      }
    ],
    "next_cursor": "cursor_token_here"
  }
}
```

---

## Error Responses

### `400 Bad Request`

```json
{
  "message": "Invalid query parameters"
}
```

### `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

# Get Summary Session Information

## Endpoint

`GET /pomodoro-session/summary`

---

## Description

Get summary information of pomodoro sessions.

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
  "message": "Pomodoro summary fetched successfully",
  "data": {
    "total_sessions": 120,
    "total_focus_time_seconds": 150000
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

| Endpoint                                 | Possible Errors    |
| ---------------------------------------- | ------------------ |
| POST `/pomodoro-sessions`                | 400, 401, 429, 500 |
| PATCH `/pomodoro-sessions/{pomodoro_id}` | 400, 401, 404, 500 |
| GET `/pomodoro-sessions`                 | 400, 401, 500      |
| GET `/pomodoro-session/summary`          | 401, 500           |