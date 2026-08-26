# Resend Verification Code Test Cases

## TC-RESEND-005: Resend a forgot-password code

**Type:** JUnit
**Priority:** Critical

### Preconditions

- A verified user has an unexpired `FORGOT_PASSWORD` code created at least one minute ago.

### Steps

1. Request a resend with purpose `FORGOT_PASSWORD`.

### Expected result

- The code and creation time are rotated and failed attempts reset.
- The existing expiry time remains unchanged.
- The new code is emailed with purpose `FORGOT_PASSWORD`.

### Actual result

- Forgot-password code rotation, creation-time refresh, unchanged expiry, persistence, and purpose-specific email assertions passed.

### Status

`PASSED`

### Evidence

- `ResentVerificationCodeServiceTest.resend_rotatesForgotPasswordCodeForVerifiedUser`
