package com.zesk.focusflow.modules.auth.dto;
import java.util.List;
import java.time.LocalDateTime;
import java.time.LocalDate;
public class InternalResult {
  public record LoginServiceResult(
    String accessToken,
    String refreshToken,
    Long userId,
    String username,
    String email,
    String profilePictureUrl,
    LocalDateTime joinedAt,
    LocalDate birthdate,
    List<String> hobbies
  ) {}
}
