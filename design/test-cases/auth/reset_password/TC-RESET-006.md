# TC-RESET-006: Reset password through the API with a valid code

**Type:** Manual end-to-end test
**Priority:** Critical

#### Preconditions

- The backend and database are running.
- `user@example.com` identifies a verified user.
- The user has an unexpired `FORGOT_PASSWORD` code `123456` with fewer than five failed attempts.

#### Steps

1. Send `POST /api/auth/reset-password` with:

   ```json
   {
     "email": "user@example.com",
     "password": "new-password",
     "confirmed_password": "new-password",
     "verification_code": "123456"
   }
   ```

2. Inspect the response and database state.

#### Expected result

- HTTP status is `200 OK`.
- Response has `success: true` and code `PASSWORD_CHANGED`.
- The stored password is a hash and is not equal to `new-password`.
- The reset verification code is deleted and cannot be reused.

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add API response and database evidence here._
