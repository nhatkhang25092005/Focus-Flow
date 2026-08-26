# TC-RESET-010: Reject an expired or missing reset code

**Type:** Manual end-to-end test
**Priority:** Critical

#### Preconditions

- The user's reset code is expired, or no `FORGOT_PASSWORD` code exists.

#### Steps

1. Send `POST /api/auth/reset-password` with otherwise valid request data.

#### Expected result

- HTTP status is `410 Gone`.
- Response code is `FORGOT_PASSWORD_VERIFY_CODE_EXPIRED`.
- An expired stored code is deleted.
- The password is unchanged.

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add API response and database evidence here._
