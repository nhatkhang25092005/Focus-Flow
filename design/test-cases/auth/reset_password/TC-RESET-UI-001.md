# TC-RESET-UI-001: Show success popup and redirect to login on successful password reset

**Type:** Manual UI test
**Priority:** Critical

#### Preconditions
- The user is on the Forgot Password Verify screen.
- A valid reset password code was sent to the user's email.

#### Steps
1. Enter the valid 6-digit verification code.
2. Enter a valid new password and confirmation password.
3. Click the "Reset Password" button.

#### Expected result
- A success popup displays confirming the password reset.
- After clicking OK, the user is redirected to the login screen.
