# Forgot Password Request Test Cases

## TC-FORGOT-002: Replace an existing reset code

- Given the user already has a `FORGOT_PASSWORD` code
- When another code is requested
- Then the existing row receives a new code and expiry
- And its failed-attempt count is reset to zero

## Status

`PASSED`