# Resend Verification Code Test Cases

## TC-RESEND-002: Reject resend for a verified account

**Type:** JUnit
**Priority:** Critical

### Preconditions

- A verified user exists.

### Steps

1. Request a resend with purpose `REGISTER`.

### Expected result

- The request fails with `CAN_NOT_RESEND_CODE_FOR_VERIFIED_ACCOUNT`.
- No code or email is created.

### Actual result

- Status, error code, and no-repository-call assertions passed.

### Status

`PASSED`

### Evidence

- `ResentVerificationCodeServiceTest.resend_rejectsRegisterCodeForVerifiedUser`
