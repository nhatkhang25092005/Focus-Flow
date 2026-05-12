# Database Schema

## Table: `user`

| Column Name   | Type         | Constraints / Notes                                   |
| ------------- | ------------ | ----------------------------------------------------- |
| id            | BIGINT       | PK, AUTO_INCREMENT                                    |
| username      | VARCHAR(50)  | NOT NULL                                              |
| password_hash | VARCHAR(255) | NOT NULL                                              |
| avatar_url    | VARCHAR(500) | NULL                                                  |
| joined_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             |
| email         | VARCHAR(255) | UNIQUE, NOT NULL                                      |
| updated_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
| birthdate     | DATE         | NULL                                                  |

---

## Table: `hobbies`

| Column Name | Type        | Constraints / Notes      |
| ----------- | ----------- | ------------------------ |
| hobby_id    | INT         | PK, AUTO_INCREMENT       |
| name        | VARCHAR(20) | NOT NULL, UNIQUE         |

---

## Table: `user_hobbies`

| Column Name   | Type   | Constraints / Notes                    |
| ------------- | ------ | -------------------------------------- |
| user_hobby_id | BIGINT | PK, AUTO_INCREMENT                     |
| user_id       | BIGINT | FK → `user.id`, NOT NULL               |
| hobby_id      | INT    | FK → `hobbies.hobby_id`, NOT NULL      |

---

## Table: `task_group`

| Column Name | Type         | Constraints / Notes                                   |
| ----------- | ------------ | ----------------------------------------------------- |
| group_id    | BIGINT       | PK, AUTO_INCREMENT                                    |
| user_id     | BIGINT       | FK → `user.id`, NOT NULL                              |
| group_name  | VARCHAR(100) | NOT NULL                                              |
| is_pinned   | BOOLEAN      | DEFAULT FALSE                                         |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
| position    | BIGINT       | NOT NULL                                              |

---

## Table: `task`

| Column Name | Type                              | Constraints / Notes                                   |
| ----------- | --------------------------------- | ----------------------------------------------------- |
| task_id     | BIGINT                            | PK, AUTO_INCREMENT                                    |
| user_id     | BIGINT                            | FK → `user.id`, NOT NULL                              |
| group_id    | BIGINT                            | FK → `task_group.group_id`, NULL                      |
| task_name   | VARCHAR(100)                      | NOT NULL                                              |
| description | VARCHAR(1000)                     | NULL                                                  |
| status      | ENUM('TODO','IN_PROGRESS','DONE') | DEFAULT 'TODO'                                        |
| created_at  | TIMESTAMP                         | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at  | TIMESTAMP                         | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
| done_at     | TIMESTAMP                         | NULL                                                  |
| is_pinned   | BOOLEAN                           | DEFAULT FALSE                                         |
| position    | BIGINT                            | NOT NULL                                              |

---

## Table: `pomodoro_session`

| Column Name      | Type                                              | Constraints / Notes                                   |
| ---------------- | ------------------------------------------------- | ----------------------------------------------------- |
| pomodoro_id      | BIGINT                                            | PK, AUTO_INCREMENT                                    |
| user_id          | BIGINT                                            | FK → `user.id`, NOT NULL                              |
| started_at       | TIMESTAMP                                         | NOT NULL                                              |
| ended_at         | TIMESTAMP                                         | NULL                                                  |
| duration_seconds | INTEGER                                           | DEFAULT 0, CHECK (`duration_seconds` <= 28800)        |
| status           | ENUM('RUNNING','COMPLETED','INTERRUPTED','PAUSED') | DEFAULT 'RUNNING'                                     |
| created_at       | TIMESTAMP                                         | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at       | TIMESTAMP                                         | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

---

## Table: `forgot_password_token`

| Column Name | Type         | Constraints / Notes                         |
| ----------- | ------------ | ------------------------------------------- |
| token_id    | BIGINT       | PK, AUTO_INCREMENT                          |
| user_id     | BIGINT       | FK → `user.id`, NOT NULL                    |
| token       | VARCHAR(255) | UNIQUE, NOT NULL                            |
| expired_at  | TIMESTAMP    | NOT NULL                                    |
| used_at     | TIMESTAMP    | NULL                                        |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                   |

---

## Table: `delete_account_token`

| Column Name | Type         | Constraints / Notes                         |
| ----------- | ------------ | ------------------------------------------- |
| token_id    | BIGINT       | PK, AUTO_INCREMENT                          |
| user_id     | BIGINT       | FK → `user.id`, NOT NULL                    |
| token       | VARCHAR(255) | UNIQUE, NOT NULL                            |
| expired_at  | TIMESTAMP    | NOT NULL                                    |
| used_at     | TIMESTAMP    | NULL                                        |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                   |

---

# Relationships

| Parent Table | Child Table            | Relationship |
| ------------ | ---------------------- | ------------ |
| user         | task_group             | 1 → N        |
| user         | task                   | 1 → N        |
| user         | pomodoro_session       | 1 → N        |
| task_group   | task                   | 1 → N        |
| user         | user_hobbies           | 1 → N        |
| hobbies      | user_hobbies           | 1 → N        |
| user         | forgot_password_token  | 1 → N        |
| user         | delete_account_token   | 1 → N        |

---

# Notes

* Một `task` có thể không thuộc `task_group` nào (`group_id` nullable).
* `position` dùng để sắp xếp task/group trên UI.
* `is_pinned` dùng để ghim task/group.
* `done_at` chỉ có giá trị khi task hoàn thành.
* `duration_seconds` lưu tổng thời gian Pomodoro thực tế.
* `password_hash` chỉ lưu hash, không lưu mật khẩu thô.
* Quan hệ giữa `user` và `hobbies` là many-to-many thông qua bảng `user_hobbies`.
* Không lưu `hobbies` trực tiếp dưới dạng `ENUM` trong bảng `user`.
* `forgot_password_token` dùng để reset password thông qua email/token xác thực.
* `delete_account_token` dùng để xác nhận xóa tài khoản an toàn hơn.
* `used_at` khác `NULL` nghĩa là token đã được sử dụng.
* `expired_at` dùng để giới hạn thời gian hiệu lực của token.