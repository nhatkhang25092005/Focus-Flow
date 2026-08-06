package com.zesk.focusflow.modules.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
  private final JavaMailSender mailSender;

  @Value("${spring.mail.username}")
  private String sender;

  public void sendVerificationCode(String to, String code){
    SimpleMailMessage message = new SimpleMailMessage();

    message.setFrom(sender);
    message.setTo(to);
    message.setSubject("FocusFlow Verification code");

    message.setText("""
      Welcome to FocusFlow!

      Your verification code is:

      %s

      This code expires in 10 minutes.
      """.formatted(code)
    );

    mailSender.send(message);
  }
}
