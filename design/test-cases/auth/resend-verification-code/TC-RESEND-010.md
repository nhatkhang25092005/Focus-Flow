# Resend Verification Code Test Cases

## TC-RESEND-010: Reject a missing verification purpose at the API boundary

**Type:** JUnit
**Priority:** High

### Preconditions

- None.

### Steps

1. POST `/api/auth/resend-verification-code` with a valid email and no purpose.

### Expected result

- The API returns HTTP `400` with code `VALIDATION_FAILED`.
- The response identifies that verification purpose is required.
- The resend verification service is not called.

### Actual result

- The missing purpose returned the expected required-field response and the service was not called.

### Status

`PASSED`

### Evidence

- `ResendVerificationCodeControllerTest.tcResend010_missingPurpose_returnsValidationError`
