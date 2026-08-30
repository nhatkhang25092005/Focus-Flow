# Database Schema

This document outlines the database tables based on the backend JPA entities.

## Table: `users`
Mapped to `User` entity.

| Column Name   | Type         | Constraints / Notes                                   |
| ------------- | ------------ | ----------------------------------------------------- |
| userId        | BIGINT       | PK, AUTO_INCREMENT                                    |
| username      | VARCHAR(100) | NOT NULL                                              |
| password_hash | VARCHAR(255) | NOT NULL                                              |
| avatar_url    | VARCHAR(500) | NULL                                                  |
| joined_at     | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                   |
| email         | VARCHAR(255) | UNIQUE, NOT NULL                                      |
| birthdate     | DATE         | NULL                                                  |
| verified      | BOOLEAN      | NOT NULL, DEFAULT FALSE                               |

---

## Table: `verification_code`
Mapped to `VerificationCode` entity.

| Column Name     | Type         | Constraints / Notes                                         |
| --------------- | ------------ | ----------------------------------------------------------- |
| id              | BIGINT       | PK, AUTO_INCREMENT                                          |
| code            | VARCHAR(8)   | NOT NULL                                                    |
| expired_at      | TIMESTAMP    | NOT NULL                                                    |
| created_at      | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                         |
| failed_attempts | INT          | NOT NULL, DEFAULT 0                                         |
| purpose         | VARCHAR(32)  | NOT NULL, DEFAULT 'REGISTER'                                |
| userId          | BIGINT       | FK (users), NOT NULL                                        |

*Note: Unique constraint `uk_verification_code_user_purpose` on `(userId, purpose)`.*

---

## Table: `refresh_tokens`
Mapped to `RefreshToken` entity.

| Column Name      | Type         | Constraints / Notes                                   |
| ---------------- | ------------ | ----------------------------------------------------- |
| refresh_token_id | BIGINT       | PK, AUTO_INCREMENT                                    |
| user_id          | BIGINT       | FK (users), NOT NULL                                  |
| token            | VARCHAR(255) | NOT NULL                                              |
| is_revoked       | BOOLEAN      | NOT NULL                                              |
| expires_at       | TIMESTAMP    | NOT NULL                                              |

---

## Table: `hobbies`
Mapped to `Hobbies` entity.

| Column Name | Type         | Constraints / Notes      |
| ----------- | ------------ | ------------------------ |
| hobby_id    | BIGINT       | PK, AUTO_INCREMENT       |
| name        | VARCHAR(255) | NULL                     |

---

## Table: `user_hobbies`
Mapped to `UserHobbies` entity.

| Column Name | Type   | Constraints / Notes      |
| ----------- | ------ | ------------------------ |
| userHobbyId | BIGINT | PK, AUTO_INCREMENT       |
| user_id     | BIGINT | FK (users), NOT NULL     |
| hobby_id    | BIGINT | FK (hobbies), NOT NULL   |

---

## Table: `task_groups`
Mapped to `TaskGroup` entity.

| Column Name | Type         | Constraints / Notes                                   |
| ----------- | ------------ | ----------------------------------------------------- |
| group_id    | BIGINT       | PK, AUTO_INCREMENT                                    |
| user_id     | BIGINT       | FK (users), NOT NULL                                  |
| group_name  | VARCHAR(100) | NOT NULL                                              |
| is_pinned   | BOOLEAN      | NOT NULL, DEFAULT FALSE                               |
| created_at  | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                   |
| updated_at  | TIMESTAMP    | NULL                                                  |
| position    | BIGINT       | NOT NULL, DEFAULT 1                                   |

---

## Table: `tasks`
Mapped to `Task` entity.

| Column Name | Type          | Constraints / Notes                                   |
| ----------- | ------------- | ----------------------------------------------------- |
| taskId      | BIGINT        | PK, AUTO_INCREMENT                                    |
| group_id    | BIGINT        | FK (task_groups), NULL                                |
| user_id     | BIGINT        | FK (users), NOT NULL                                  |
| status      | VARCHAR(255)  | NOT NULL, DEFAULT 'TODO' (Enum: TaskStatus)           |
| description | VARCHAR(1000) | NULL                                                  |
| task_name   | VARCHAR(100)  | NOT NULL                                              |
| created_at  | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                   |
| updated_at  | TIMESTAMP     | NULL                                                  |
| done_at     | TIMESTAMP     | NULL                                                  |
| position    | BIGINT        | NOT NULL, DEFAULT 1                                   |
| is_pinned   | BOOLEAN       | NOT NULL, DEFAULT FALSE                               |

---

## Table: `pomodoro_sessions`
Mapped to `PomodoroSession` entity.

| Column Name      | Type         | Constraints / Notes                                   |
| ---------------- | ------------ | ----------------------------------------------------- |
| pomodoro_id      | BIGINT       | PK, AUTO_INCREMENT                                    |
| user_id          | BIGINT       | FK (users), NOT NULL                                  |
| started_at       | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                   |
| ended_at         | TIMESTAMP    | NULL                                                  |
| duration_seconds | BIGINT       | NOT NULL, DEFAULT 0                                   |
| status           | VARCHAR(255) | NOT NULL (Enum: PomodoroStatus)                       |
| created_at       | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                   |
| updated_at       | TIMESTAMP    | NULL                                                  |