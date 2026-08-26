# TC-RESET-011: Reject invalid request fields

**Type:** Manual end-to-end test
**Priority:** High

#### Preconditions

- The backend is running.

#### Steps

1. Send requests containing an invalid email, a password shorter than eight characters, a password longer than 64 characters, or a blank verification code.

#### Expected result

- Each request returns `400 Bad Request` with code `VALIDATION_FAILED`.
- The response identifies the invalid field.
- The service does not change the password or verification code.

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add API responses here._
