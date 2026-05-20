package com.zesk.focusflow.common;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiErrorResponse(
  Boolean success,
  String code,
  String message,
  Map<String, String> errors
) {}
