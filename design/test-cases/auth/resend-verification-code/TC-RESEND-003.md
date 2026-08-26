# Resend Verification Code Test Cases

## TC-RESEND-003: Enforce the one-minute resend limit

**Type:** JUnit
**Priority:** Critical

### Preconditions

- The matching code was created less than one minute ago.

### Steps

1. Request another code for the same email and purpose.

### Expected result

- The request fails with `RESEND_REQUEST_IS_LIMITED_BY_1M`.
- The existing code remains unchanged and no email is sent.

### Actual result

- Rate-limit status and no-mutation assertions passed.

### Status

`PASSED`

### Evidence

- `ResentVerificationCodeServiceTest.resend_rejectsRequestWithinOneMinute`
