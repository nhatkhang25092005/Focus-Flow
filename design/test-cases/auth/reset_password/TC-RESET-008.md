# TC-RESET-008: Reject an invalid code before the fifth attempt

**Type:** Manual end-to-end test
**Priority:** Critical

#### Preconditions

- The user has an unexpired reset code with zero to three failed attempts.

#### Steps

1. Send `POST /api/auth/reset-password` with matching valid passwords and an incorrect `verification_code`.
2. Inspect the verification-code row.

#### Expected result

- HTTP status is `400 Bad Request`.
- Response code is `FORGOT_PASSWORD_VERIFY_CODE_NOT_MATCHED`.
- Failed attempts increase by exactly one.
- The code remains available for another attempt.
- The password is unchanged.

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add API response and database evidence here._
