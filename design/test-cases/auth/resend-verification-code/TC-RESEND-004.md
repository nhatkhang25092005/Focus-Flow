# Resend Verification Code Test Cases

## TC-RESEND-004: Reject a missing or expired code

**Type:** JUnit
**Priority:** High

### Preconditions

- The matching code is absent or expired.

### Steps

1. Request a resend for its email and purpose.

### Expected result

- The request fails with `RESEND_CODE_EXPIRED`.
- An expired stored code is deleted.
- No email is sent.

### Actual result

- Expired-code status, deletion, and no-email assertions passed.

### Status

`PASSED`

### Evidence

- `ResentVerificationCodeServiceTest.resend_rejectsAndDeletesExpiredCode`
- `ResentVerificationCodeServiceTest.resend_rejectsMissingCodeAsExpired`
