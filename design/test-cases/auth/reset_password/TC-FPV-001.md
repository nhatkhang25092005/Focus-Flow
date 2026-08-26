# TC-FPV-001: Change password with a valid reset code

**Type:** JUnit
**Priority:** Critical

#### Preconditions

- A user has an unexpired `FORGOT_PASSWORD` verification code.

#### Steps

1. Submit matching valid passwords and the correct verification code.

#### Expected result

- The new password is hashed and saved.
- The verification code is deleted.
- The endpoint returns `PASSWORD_CHANGED`.

#### Actual result

- Service and controller assertions passed.

#### Status

`PASSED`

#### Evidence

- `ResetPasswordServiceTest.changePassword_hashesPasswordAndConsumesCode`
- `ForgotPasswordControllerTest.resetPassword_changesPassword`
