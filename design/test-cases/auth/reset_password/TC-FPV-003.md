# TC-FPV-003: Track an invalid verification code

**Type:** JUnit
**Priority:** Critical

#### Preconditions

- An unexpired reset code has fewer than four failed attempts.

#### Steps

1. Submit an incorrect verification code.

#### Expected result

- Failed attempts increase by one.
- The password is unchanged.
- The API reports an invalid code.

#### Actual result

- Service assertions passed.

#### Status

`PASSED`

#### Evidence

- `ResetPasswordServiceTest.changePassword_incrementsInvalidAttemptWithoutChangingPassword`
