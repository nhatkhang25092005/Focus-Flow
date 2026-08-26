# TC-FPV-005: Reject an expired or missing reset code

**Type:** JUnit
**Priority:** Critical

#### Preconditions

- The reset code is expired or absent.

#### Steps

1. Submit a password-reset verification request.

#### Expected result

- The password is unchanged.
- An expired stored code is deleted.
- The API reports that the code is missing or expired.

#### Actual result

- Both service scenarios passed.

#### Status

`PASSED`

#### Evidence

- `ResetPasswordServiceTest.changePassword_rejectsAndDeletesExpiredCode`
- `ResetPasswordServiceTest.changePassword_rejectsMissingCode`
