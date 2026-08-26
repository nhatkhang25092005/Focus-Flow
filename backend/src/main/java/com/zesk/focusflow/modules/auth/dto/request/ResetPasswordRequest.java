package com.zesk.focusflow.modules.auth.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zesk.focusflow.modules.auth.constants.LoginErrors;
import com.zesk.focusflow.modules.auth.constants.RegisterErrors;
import com.zesk.focusflow.shared.validation.FieldMatch;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@FieldMatch(
  first = "new_password",
  second = "confirmed_password",
  message = RegisterErrors.CONFIRM_PASSWORD_MISMATCH
)
public class ResetPasswordRequest {
  @NotBlank(message = LoginErrors.EMAIL_BLANK)
  @Email(message = LoginErrors.EMAIL_FORMAT)
  private String email;

  @NotBlank(message = RegisterErrors.PASSWORD_BLANK)
  @Size(min = 8, max = 64, message = RegisterErrors.PASSWORD_FORMAT)
  @JsonProperty("new_password")
  private String newPassword;

  @NotBlank(message = RegisterErrors.CONFIRM_PASSWORD_BLANK)
  @Size(min = 8, max = 64, message = RegisterErrors.PASSWORD_FORMAT)
  @JsonProperty("confirmed_password")
  private String confirmedPassword;

  @NotBlank(message = "Verification code must not be blank")
  @JsonProperty("verification_code")
  private String verificationCode;
}
