# Todo API Contracts

# Create Task

## Endpoint

`POST /tasks`

---

## Description

Create a new task.

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

| Field       | Type   | Required | Rules          |
| ----------- | ------ | -------- | -------------- |
| task_name       | string | Yes      | max 255 chars  |
| description | string | No       | max 1000 chars |
| position    | number | No       | must be > 0    |

---

## Example Request

```json
{
  "title": "Finish API documentation",
  "description": "Write todo module API contracts",
  "position": 1
}
```

---

## Success Response

### `201 Created`

```json
{
  "message": "Task created successfully",
  "data": {
    "task_id": 1
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

### `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

# Tasks List

## Endpoint

`GET /tasks?cursor={cursor}&limit={limit}`

---

## Description

Get tasks list with cursor pagination.

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

| Field  | Type   | Required | Rules                           |
| ------ | ------ | -------- | ------------------------------- |
| cursor | string | No       | must be valid cursor            |
| limit  | number | No       | must be greater than 0, max 100 |

---

## Example Request

`GET /tasks?limit=20`

---

## Success Response

### `200 OK`

```json
{
  "message": "Tasks fetched successfully",
  "data": {
    "tasks_list": [
      {
        "id": 1,
        "title": "Finish API documentation",
        "description": "Write todo module API contracts",
        "status": "TODO",
        "position": 1,
        "is_pinned": false
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

# Adjust Task

## Endpoint

`PATCH /tasks/{task_id}`

---

## Description

Update task information.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Path Parameters

| Field   | Type   | Required | Rules                    |
| ------- | ------ | -------- | ------------------------ |
| task_id | number | Yes      | must be existing task id |

---

## Request Body

| Field       | Type    | Required | Rules                                 |
| ----------- | ------- | -------- | ------------------------------------- |
| task_name   | string  | No       | max 100 chars                         |
| description | string  | No       | max 1000 chars                        |
| status      | string  | No       | must be `TODO`, `IN_PROGRESS`, `DONE` |
| position    | number  | No       | must be > 0                           |
| is_pinned   | boolean | No       | must be true or false                 |

---

## Example Request

```json
{
  "task_name": "Finish API docs",
  "status": "IN_PROGRESS",
  "is_pinned": true
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Task updated successfully"
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
  "message": "Task not found"
}
```

---

# Delete Task

## Endpoint

`DELETE /tasks/{task_id}`

---

## Description

Delete a task.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Path Parameters

| Field   | Type   | Required | Rules                    |
| ------- | ------ | -------- | ------------------------ |
| task_id | number | Yes      | must be existing task id |

---

## Success Response

### `200 OK`

```json
{
  "message": "Task deleted successfully"
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

### `404 Not Found`

```json
{
  "message": "Task not found"
}
```

---

# Create Group

## Endpoint

`POST /groups`

---

## Description

Create a new task group.

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

| Field      | Type    | Required | Rules                 |
| ---------- | ------- | -------- | --------------------- |
| group_name | string  | Yes      | max 1005 chars         |
| position   | number  | No       | must be > 0           |

---

## Example Request

```json
{
  "group_name": "Work",
  "position": 1,
}
```

---

## Success Response

### `201 Created`

```json
{
  "message": "Group created successfully",
  "data": {
    "group_id": 1
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

### `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

# Groups List

## Endpoint

`GET /groups?cursor={cursor}&limit={limit}`

---

## Description

Get groups list with cursor pagination.

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

| Field  | Type   | Required | Rules                           |
| ------ | ------ | -------- | ------------------------------- |
| cursor | string | No       | must be valid cursor            |
| limit  | number | No       | must be greater than 0, max 100 |

---

## Example Request

`GET /groups?limit=20`

---

## Success Response

### `200 OK`

```json
{
  "message": "Groups fetched successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "group_name": "Work",
        "position": 1,
        "is_pinned": true
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

# Adjust Group

## Endpoint

`PATCH /groups/{group_id}`

---

## Description

Update group information.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Path Parameters

| Field    | Type   | Required | Rules                     |
| -------- | ------ | -------- | ------------------------- |
| group_id | number | Yes      | must be existing group id |

---

## Request Body

| Field      | Type    | Required | Rules                 |
| ---------- | ------- | -------- | --------------------- |
| group_name | string  | No       | max 255 chars         |
| position   | number  | No       | must be > 0           |
| is_pinned  | boolean | No       | must be true or false |

---

## Example Request

```json
{
  "group_name": "Personal",
  "is_pinned": false,
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Group updated successfully"
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
  "message": "Group not found"
}
```

---

# Delete Group

## Endpoint

`DELETE /groups/{group_id}`

---

## Description

Delete a group.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Path Parameters

| Field    | Type   | Required | Rules                     |
| -------- | ------ | -------- | ------------------------- |
| group_id | number | Yes      | must be existing group id |

---

## Success Response

### `200 OK`

```json
{
  "message": "Group deleted successfully"
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

### `404 Not Found`

```json
{
  "message": "Group not found"
}
```

---

# Add Task Into Group

## Endpoint

`POST /groups/{group_id}/tasks`

---

## Description

Add a task into a group.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Path Parameters

| Field    | Type   | Required | Rules                     |
| -------- | ------ | -------- | ------------------------- |
| group_id | number | Yes      | must be existing group id |

---

## Request Body

| Field    | Type   | Required | Rules                    |
| -------- | ------ | -------- | ------------------------ |
| task_id  | number | Yes      | must be existing task id |
| position | number | No       | must be > 0              |

---

## Example Request

```json
{
  "task_id": 1,
  "position": 1
}
```

---

## Success Response

### `200 OK`

```json
{
  "message": "Task added into group successfully"
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
  "message": "Group or task not found"
}
```

---

# Remove Task From Group

## Endpoint

`DELETE /groups/{group_id}/tasks/{task_id}`

---

## Description

Remove a task from a group.

---

## Authentication

Requires Bearer Token.

---

## Headers

| Key           | Value              |
| ------------- | ------------------ |
| Authorization | Bearer accessToken |

---

## Path Parameters

| Field    | Type   | Required | Rules                     |
| -------- | ------ | -------- | ------------------------- |
| group_id | number | Yes      | must be existing group id |
| task_id  | number | Yes      | must be existing task id  |

---

## Success Response

### `200 OK`

```json
{
  "message": "Task removed from group successfully"
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

### `404 Not Found`

```json
{
  "message": "Group or task not found"
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

| Endpoint                                      | Possible Errors      |
| --------------------------------------------- | -------------------- |
| POST `/tasks`                                 | 400, 401, 500        |
| GET `/tasks`                                  | 400, 401, 500        |
| PATCH `/tasks/{task_id}`                      | 400, 401, 404, 500   |
| DELETE `/tasks/{task_id}`                     | 401, 404, 500        |
| POST `/groups`                                | 400, 401, 500        |
| GET `/groups`                                 | 400, 401, 500        |
| PATCH `/groups/{group_id}`                    | 400, 401, 404, 500   |
| DELETE `/groups/{group_id}`                   | 401, 404, 500        |
| POST `/groups/{group_id}/tasks`               | 400, 401, 404, 500   |
| DELETE `/groups/{group_id}/tasks/{task_id}`   | 401, 404, 500        |