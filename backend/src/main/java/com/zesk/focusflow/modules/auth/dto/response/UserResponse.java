package com.zesk.focusflow.modules.auth.dto.response;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.time.LocalDate;
public record UserResponse(
  @JsonProperty("user_id") Long userId,
  @JsonProperty("username") String username,
  @JsonProperty("email") String email,
  @JsonProperty("avatar_url") String avatarUrl,
  @JsonProperty("birthdate") LocalDate birthdate,
  @JsonProperty("joined_at") LocalDateTime joinedAt,
  @JsonProperty("hobbies") List<String> hobbies
) {}
