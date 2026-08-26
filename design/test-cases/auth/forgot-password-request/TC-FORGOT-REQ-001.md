# Forgot Password Request Test Cases

## TC-FORGOT-001: Send a reset code

- Given a verified user exists for the requested email
- When `POST /api/auth/forgot-password-request` receives a valid email
- Then a `FORGOT_PASSWORD` code with zero failed attempts and a ten-minute expiry is saved
- And the code is sent to that email
- And the endpoint returns `FORGOT_PASSWORD_CODE_SENT`

## Status

`PASSED`