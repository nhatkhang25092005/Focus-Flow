package com.zesk.focusflow.shared.validation;

import org.springframework.beans.BeanWrapperImpl;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FieldMatchValidator implements ConstraintValidator<FieldMatch, Object> {
  private String firstFieldName;  // the name of the first field
  private String secondFieldName; // the name of the second field
  private String message;         // the error message to display if the validation fails

  // Logger
  private static final Logger log = LoggerFactory.getLogger(FieldMatchValidator.class);

  @Override
  public boolean isValid(Object value, ConstraintValidatorContext context) {
    boolean valid = true;
    try{
      final Object firstObj = new BeanWrapperImpl(value).getPropertyValue(firstFieldName);
      final Object secondObj = new BeanWrapperImpl(value).getPropertyValue(secondFieldName);
      valid = (firstObj == null && secondObj == null) || (firstObj != null && firstObj.equals(secondObj));
    } catch (final Exception e){
      log.error("FieldMatch validation fail", e);
    }
    if(!valid){
      context.buildConstraintViolationWithTemplate(message) // Create error 
        .addPropertyNode(secondFieldName)                   // Set the error node to the field
        .addConstraintViolation()                           // Add the error to the context
        .disableDefaultConstraintViolation();               // Disable the default error 
    }
    return valid;
  }

  @Override
  public void initialize(final FieldMatch constraintAnnotation) {
    firstFieldName = constraintAnnotation.first();
    secondFieldName = constraintAnnotation.second();
    message = constraintAnnotation.message();
  }

}
