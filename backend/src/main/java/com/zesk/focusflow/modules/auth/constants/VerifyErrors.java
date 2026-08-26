package com.zesk.focusflow.modules.auth.constants;

public final class VerifyErrors {
  public static final String EMAIL_BLANK = "Email is required";
  public static final String EMAIL_FORMAT = "Invalid email format";
  public static final String CODE_BLANK = "Verification code is required";
  public static final String CODE_LENGTH = "Verification code must be 6 characters";

  private VerifyErrors() {}
}
