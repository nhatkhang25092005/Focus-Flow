# TC-FPV-002: Reject mismatched passwords

**Type:** JUnit
**Priority:** High

#### Preconditions

- None.

#### Steps

1. Submit different `password` and `confirmed_password` values.

#### Expected result

- Request validation fails.
- The service is not invoked.

#### Actual result

- Controller validation assertions passed.

#### Status

`PASSED`

#### Evidence

- `ForgotPasswordControllerTest.resetPassword_rejectsMismatchedPasswords`
