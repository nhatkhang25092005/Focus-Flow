# Verify Account Test Cases

## End-to-End Test Cases

End-to-end UI-to-database verification was not requested or executed for this backend-only change.

## UI Test Cases

### TC-VERIFY-UI-001: Show success popup and redirect to login on successful verification

**Type:** Manual UI test
**Priority:** Critical

#### Preconditions
- The user is on the Verify Account screen after registration.
- A valid verification code was sent to the user's email.

#### Steps
1. Enter the valid 6-digit verification code.
2. Click the "Verify account" button.

#### Expected result
- A success popup displays confirming the account is verified.
- The user is redirected to the login screen.

### TC-VERIFY-UI-002: Show error popup and redirect to register on too many attempts

**Type:** Manual UI test
**Priority:** High

#### Preconditions
- The user is on the Verify Account screen.

#### Steps
1. Enter an invalid 6-digit verification code.
2. Click "Verify account".
3. Repeat step 1 and 2 until the maximum number of failed attempts is reached (e.g. 5 times).

#### Expected result
- An error popup displays stating there have been too many failed attempts.
- The user is automatically redirected to the registration screen.

### TC-VERIFY-UI-003: Resend code triggers countdown and success toast

**Type:** Manual UI test
**Priority:** High

#### Preconditions
- The user is on the Verify Account screen.
- The resend button is enabled.

#### Steps
1. Click the "Resend code" button.

#### Expected result
- A success toast is displayed indicating a new code was sent.
- The "Resend code" button becomes disabled.
- The button text changes to show a countdown timer.

## Backend Test Cases

### TC-VERIFY-001: Correct code verifies the account

**Type:** JUnit
**Priority:** Critical

#### Preconditions

- An unverified user and an unexpired verification code exist for the supplied email.

#### Steps

1. Submit the matching email and verification code.

#### Expected result

- The user becomes verified.
- The verification code is deleted.
- The endpoint responds with `VERIFY_SUCCESS`.

#### Actual result

- Service and controller tests passed; the user update, code deletion, and response code were verified.

#### Status

`PASSED`

#### Evidence

- `mvnw.cmd -Djacoco.skip=true -Dtest=AuthServiceVerificationTest,AuthControllerTest test`

### TC-VERIFY-002: Email does not identify a user

**Type:** JUnit
**Priority:** High

#### Preconditions

- No user exists for the supplied email.

#### Steps

1. Submit the email and a six-character verification code.

#### Expected result

- Verification is rejected with HTTP 404 and `USER_NOT_FOUND`.

#### Actual result

- The service test passed with the expected status and code.

#### Status

`PASSED`

#### Evidence

- `AuthServiceVerificationTest.verifyAccount_rejectsUnknownUser`

### TC-VERIFY-003: User was verified previously

**Type:** JUnit
**Priority:** High

#### Preconditions

- A verified user exists for the supplied email.

#### Steps

1. Submit the email and a verification code.

#### Expected result

- Verification is rejected with HTTP 409 and `USER_VERIFIED_BEFORE`.
- No verification code is queried or consumed.

#### Actual result

- The service test passed with the expected status, code, and repository interaction.

#### Status

`PASSED`

#### Evidence

- `AuthServiceVerificationTest.verifyAccount_rejectsAlreadyVerifiedUser`

### TC-VERIFY-004: Verification code does not match

**Type:** JUnit
**Priority:** Critical

#### Preconditions

- An unverified user and an unexpired verification code exist.

#### Steps

1. Submit a different six-character verification code.

#### Expected result

- Verification is rejected with HTTP 400 and `VERIFY_CODE_NOT_MATCHED`.
- The user remains unverified and the code is not deleted.

#### Actual result

- The service test passed and neither persistence mutation occurred.

#### Status

`PASSED`

#### Evidence

- `AuthServiceVerificationTest.verifyAccount_rejectsMismatchedCode`

### TC-VERIFY-005: Verification code is absent or expired

**Type:** JUnit
**Priority:** Critical

#### Preconditions

- An unverified user exists and its code is absent or has reached `expiredAt`.

#### Steps

1. Submit the user's email and verification code.

#### Expected result

- Verification is rejected with HTTP 410 and `VERIFY_CODE_EXPIRED`.
- The user remains unverified.

#### Actual result

- Missing-code and stored-expired-code service tests passed.

#### Status

`PASSED`

#### Evidence

- `AuthServiceVerificationTest.verifyAccount_rejectsMissingOrExpiredCode`
- `AuthServiceVerificationTest.verifyAccount_rejectsCodeThatIsStillStoredAfterExpiry`
