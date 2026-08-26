# TC-RESET-007: Reject mismatched password confirmation

**Type:** Manual end-to-end test
**Priority:** High

#### Preconditions

- The backend is running.

#### Steps

1. Send `POST /api/auth/reset-password` with valid email and code values, but different `password` and `confirmed_password` values.

#### Expected result

- HTTP status is `400 Bad Request`.
- Response code is `VALIDATION_FAILED`.
- The password and verification-code attempt count are unchanged.

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add the API response here._
