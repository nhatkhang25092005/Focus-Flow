# TC-RESET-UI-002: Redirect to forgot request screen on expired code

**Type:** Manual UI test
**Priority:** High

#### Preconditions
- The user is on the Forgot Password Verify screen.
- The reset password code sent to the user's email has expired.

#### Steps
1. Enter the expired 6-digit verification code.
2. Enter a valid new password and confirmation password.
3. Click the "Reset Password" button.

#### Expected result
- An error popup displays stating the verification code has expired.
- The user is automatically redirected to the forgot password request screen to request a new code.
