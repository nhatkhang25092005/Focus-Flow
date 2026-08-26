# Resend Verification Code Test Cases

## TC-RESEND-007: Return the resend API success response

**Type:** JUnit
**Priority:** Critical

### Preconditions

- The resend verification service accepts a valid request.

### Steps

1. POST `/api/auth/resend-verification-code` with a valid email and `FORGOT_PASSWORD` purpose.

### Expected result

- The API returns HTTP `200`.
- The response contains `success: true`, code `VERIFICATION_CODE_RESENT`, the success message, and no data.
- The controller delegates the parsed email and purpose to the resend verification service once.

### Actual result

- The response contract and exact service request values were verified successfully.

### Status

`PASSED`

### Evidence

- `ResendVerificationCodeControllerTest.tcResend007_validRequest_returnsSuccess`
