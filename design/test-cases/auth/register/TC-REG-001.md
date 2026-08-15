# Register UI Test Cases

## TC-REG-001: Existing verified account

**Type:** Manual UI test
**Priority:** High

### Preconditions

- Frontend and backend are running.
- A verified account exists with `test@gmail.com`.
- Language is Vietnamese.

### Steps

1. Open the registration page.
2. Enter valid registration information.
3. Use `test@gmail.com`.
4. Click Register.

### Expected result

- An error toast appears.
- Toast message: `An account with this email already exists.`
- Form is not cleared.
- No success popup appears.

### Actual result

_To be completed during testing._

### Status

`PASSED`

### Evidence

![TC-REG-001 result](../../evidence/TC-REG-001.png)
