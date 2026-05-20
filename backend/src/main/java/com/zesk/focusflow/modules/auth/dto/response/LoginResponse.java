package com.zesk.focusflow.modules.auth.dto.response;
import com.fasterxml.jackson.annotation.JsonProperty;
public record LoginResponse (
  @JsonProperty("access_token") String accessToken,
  @JsonProperty("user") UserResponse user
) {}
  
