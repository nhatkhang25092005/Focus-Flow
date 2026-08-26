# Resend Verification Code Test Cases

## TC-RESEND-008: Reject an invalid email at the API boundary

**Type:** JUnit
**Priority:** High

### Preconditions

- None.

### Steps

1. POST `/api/auth/resend-verification-code` with an invalid email and a valid purpose.

### Expected result

- The API returns HTTP `400` with code `VALIDATION_FAILED`.
- The response identifies the email format error.
- The resend verification service is not called.

### Actual result

- The invalid email returned the expected validation response and the service was not called.

### Status

`PASSED`

### Evidence

- `ResendVerificationCodeControllerTest.tcResend008_invalidEmail_returnsValidationError`
