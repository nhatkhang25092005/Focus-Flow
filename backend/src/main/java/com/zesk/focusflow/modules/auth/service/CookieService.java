package com.zesk.focusflow.modules.auth.service;

import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.time.Duration;
import java.util.Arrays;
import jakarta.servlet.http.Cookie;

@Service
public class CookieService {
  private static final String REFRESH_TOKEN_COOKIE = "refresh_token";
  @Value("${jwt.refresh-expiration}")
  private Long refreshTokenExpirationDate;
  
  public void addRefreshTokenCookie(
    HttpServletResponse response,
    String refreshToken
  ){
    // Logic to add refresh token as a cookie in the response
    ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_COOKIE, refreshToken)
      .httpOnly(true)
      .secure(true)
      .path("/api/auth")
      .sameSite("Strict")
      .maxAge(Duration.ofDays(refreshTokenExpirationDate)) // 24 hours
      .build();
    response.addHeader("Set-Cookie", cookie.toString());
  }

  public Optional<String> getRefreshTokenCookie(HttpServletRequest request) {
    // Logic to retrieve refresh token from cookies in the request
    Cookie[] cookies = request.getCookies();

    if(cookies == null)
      return Optional.empty();
    
    return Arrays.stream(request.getCookies())
      .filter(cookie -> REFRESH_TOKEN_COOKIE.equals(cookie.getName()))
      .map(Cookie::getValue)
      .findFirst();
  }

  public void clearRefreshTokenCookie(HttpServletResponse response) {
    // Logic to clear the refresh token cookie
    ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_COOKIE, "")
      .httpOnly(true)
      .secure(true)
      .path("/api/auth")
      .maxAge(0) // Expire immediately
      .sameSite("Strict")
      .build();
    response.addHeader("Set-Cookie", cookie.toString());
  }
}
