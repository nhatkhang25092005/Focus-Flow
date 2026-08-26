# TC-FPV-004: Delete the code on the fifth invalid attempt

**Type:** JUnit
**Priority:** Critical

#### Preconditions

- An unexpired reset code has four failed attempts.

#### Steps

1. Submit an incorrect verification code.

#### Expected result

- The code reaches five failed attempts and is deleted.
- The password is unchanged.
- The API reports too many attempts.

#### Actual result

- Service assertions passed.

#### Status

`PASSED`

#### Evidence

- `ResetPasswordServiceTest.changePassword_deletesCodeOnFifthInvalidAttempt`
