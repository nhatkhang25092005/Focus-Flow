package com.zesk.focusflow.modules.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.zesk.focusflow.enums.VerificationPurpose;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
  private final JavaMailSender mailSender;

  @Value("${spring.mail.username}")
  private String sender;

  public void sendVerificationCode(String to, String code, VerificationPurpose purpose) {
    SimpleMailMessage message = new SimpleMailMessage();

    message.setFrom(sender);
    message.setTo(to);

    if (purpose == VerificationPurpose.REGISTER) {
      message.setSubject("FocusFlow Verification code");

      message.setText("""
          Welcome to FocusFlow!

          Your verification code is:

          %s

          This code expires in 10 minutes.
          """.formatted(code));
    }

    else {
      message.setSubject("FocusFlow Forgot Password code");

      message.setText("""
          FocusFlow here for assist!

          Your forgot password verification code is:

          %s

          This code expires in 10 minutes.
          """.formatted(code));
    }

    mailSender.send(message);
  }
}
