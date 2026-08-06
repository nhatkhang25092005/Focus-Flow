package com.zesk.focusflow.modules.auth.constants;

public class RegisterErrors {
  public static final String EMAIL_FORMAT = "Invalid email format";
  public static final String EMAIL_BLANK = "Email is required";

  public static final String PASSWORD_FORMAT =
      "Password must be between 8 and 64 characters";

  public static final String PASSWORD_BLANK = "Password is required";
  public static final String CONFIRM_PASSWORD_BLANK = "Confirm password is required";
  public static final String CONFIRM_PASSWORD_MISMATCH = "Confirm password does not match";

  public static final String USERNAME_BLANK = "Username is required";
  public static final String USERNAME_LENGTH = "Username must be between 3 and 50 characters";

}
