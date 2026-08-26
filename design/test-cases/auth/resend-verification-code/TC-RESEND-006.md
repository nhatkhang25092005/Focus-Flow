# Resend Verification Code Test Cases

## TC-RESEND-006: Reject forgot-password resend for an ineligible account

**Type:** JUnit
**Priority:** High

### Preconditions

- The email is missing or belongs to an unverified user.

### Steps

1. Request a resend with purpose `FORGOT_PASSWORD`.

### Expected result

- The request fails with `EMAIL_NOT_FOUND`.
- No code or email is created.

### Actual result

- Generic not-found response and no-code-query assertions passed.

### Status

`PASSED`

### Evidence

- `ResentVerificationCodeServiceTest.resend_rejectsForgotPasswordForUnverifiedUser`
