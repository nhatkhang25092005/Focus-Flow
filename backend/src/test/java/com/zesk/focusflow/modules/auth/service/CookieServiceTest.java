package com.zesk.focusflow.modules.auth.service;
import jakarta.servlet.http.Cookie;
import org.springframework.http.HttpHeaders;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.assertj.core.api.Assertions.assertThat;
class CookieServiceTest {
  private final CookieService cookieService = new CookieService();

  @Test
  void addRefreshTokenCookie_addsCookieHeader(){
    MockHttpServletResponse response = new MockHttpServletResponse();
    cookieService.addRefreshTokenCookie(response, "test-refresh-token");
    String cookie = response.getHeader(HttpHeaders.SET_COOKIE);

    assertThat(cookie)
      .contains("refresh_token=test-refresh-token")
      .contains("HttpOnly")
      .contains("Secure")
      .contains("Path=/api/auth")
      .contains("Max-Age=86400");
  }

  @Test
  void getRefreshTokenCookie_returnsCookieValue(){
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.setCookies(new Cookie("refresh_token", "test-refresh-token"));
    assertThat(cookieService.getRefreshTokenCookie(request))
      .contains("test-refresh-token");
  }
}
