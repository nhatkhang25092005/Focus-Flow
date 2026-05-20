package com.zesk.focusflow.modules.test.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
public class TestController {

  @GetMapping("/test")
  public Object test(Authentication authentication) {
    if(authentication == null) {
      return "No authentication";
    }
    return "Authenticated as: " + authentication.getName();
  }
}
