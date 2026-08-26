# Resend Verification Code Test Cases

## TC-RESEND-009: Reject a blank email at the API boundary

**Type:** JUnit
**Priority:** High

### Preconditions

- None.

### Steps

1. POST `/api/auth/resend-verification-code` with a blank email and a valid purpose.

### Expected result

- The API returns HTTP `400` with code `VALIDATION_FAILED`.
- The response identifies that email is required.
- The resend verification service is not called.

### Actual result

- The blank email returned the expected required-field response and the service was not called.

### Status

`PASSED`

### Evidence

- `ResendVerificationCodeControllerTest.tcResend009_blankEmail_returnsValidationError`
