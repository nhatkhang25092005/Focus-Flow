# TC-RESET-009: Delete the code on the fifth invalid attempt

**Type:** Manual end-to-end test
**Priority:** Critical

#### Preconditions

- The user has an unexpired reset code with four failed attempts.

#### Steps

1. Send `POST /api/auth/reset-password` with an incorrect `verification_code`.
2. Inspect the verification-code row and user password.

#### Expected result

- HTTP status is `429 Too Many Requests`.
- Response code is `FORGOT_PASSWORD_TOO_MANY_VERIFY_ATTEMPTS`.
- The verification code is deleted.
- The password is unchanged.

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add API response and database evidence here._
