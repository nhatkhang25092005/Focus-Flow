# Resend Verification Code Test Cases

## TC-RESEND-001: Resend an account-verification code

**Type:** JUnit
**Priority:** Critical

### Preconditions

- An unverified user has an unexpired `REGISTER` code created at least one minute ago.

### Steps

1. Request a resend with purpose `REGISTER`.

### Expected result

- The code is rotated, failed attempts reset, and creation time refreshed.
- The existing expiry time remains unchanged.
- The new code is emailed with purpose `REGISTER`.

### Actual result

- Code rotation, creation-time refresh, attempt reset, unchanged expiry, persistence, and email assertions passed.

### Status

`PASSED`

### Evidence

- `ResentVerificationCodeServiceTest.resend_rotatesRegisterCodeForUnverifiedUser`
