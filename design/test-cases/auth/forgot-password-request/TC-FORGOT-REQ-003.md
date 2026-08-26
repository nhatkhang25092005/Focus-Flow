# Forgot Password Request Test Cases

## TC-FORGOT-003: Email does not identify an eligible account

- Given the requested email does not identify a verified user
- When a reset code is requested
- Then no verification code is saved and no email is sent
- And the endpoint returns HTTP 404 with `EMAIL_NOT_FOUND`

## Status

`PASSED`