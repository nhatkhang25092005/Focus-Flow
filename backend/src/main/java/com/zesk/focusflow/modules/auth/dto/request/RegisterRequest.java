package com.zesk.focusflow.modules.auth.dto.request;

import java.time.LocalDate;

import com.zesk.focusflow.modules.auth.constants.RegisterErrors;
import com.zesk.focusflow.shared.validation.FieldMatch;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@FieldMatch(
  first = "password",
  second = "confirmedPassword",
  message = RegisterErrors.CONFIRM_PASSWORD_MISMATCH
)
public class RegisterRequest {
  @NotBlank(message = RegisterErrors.EMAIL_BLANK)
  @Email(message = RegisterErrors.EMAIL_FORMAT)
  private String email;

  @NotBlank(message = RegisterErrors.USERNAME_BLANK)
  @Size(min = 3,max = 50,message = RegisterErrors.USERNAME_LENGTH)
  private String username;

  @NotBlank(message = RegisterErrors.PASSWORD_BLANK)
  @Size(min = 8, max = 64, message = RegisterErrors.PASSWORD_FORMAT)
  private String password;

  @NotBlank(message = RegisterErrors.CONFIRM_PASSWORD_BLANK)
  @Size(min = 8, max = 64, message = RegisterErrors.PASSWORD_FORMAT)
  private String confirmedPassword;

  @Past
  private LocalDate birthdate;

  public RegisterRequest(){}

}
