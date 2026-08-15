# FocusFlow Security Rules

## Password

- Never store plain-text passwords.
- Passwords must be hashed using the project's PasswordEncoder.
- Password values must never appear in logs.

## JWT

- Access tokens must have limited lifetime.
- Token validation must check signature and expiration.
- Do not expose signing secrets.

## Refresh Token

- Refresh tokens must be invalidatable.
- Logout must revoke/delete the associated refresh token.
- Do not accept expired refresh tokens.

## Email Verification

- Verification codes must expire.
- Codes should not remain usable after successful verification.

## Password Reset

- Reset codes/tokens must expire.
- A successful reset invalidates the corresponding reset token.