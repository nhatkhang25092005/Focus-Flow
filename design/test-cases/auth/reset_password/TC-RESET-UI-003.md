# TC-RESET-UI-003: Resend code triggers countdown and success toast

**Type:** Manual UI test
**Priority:** High

#### Preconditions
- The user is on the Forgot Password Verify screen.
- The resend button is enabled.

#### Steps
1. Click the "Resend code" button.

#### Expected result
- A success toast is displayed indicating a new code was sent.
- The "Resend code" button becomes disabled.
- The button text changes to show a countdown timer.
