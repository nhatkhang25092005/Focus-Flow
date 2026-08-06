package com.zesk.focusflow.shared.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.annotation.Retention;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FieldMatchValidator.class) // The class that will validate the annotation
@Documented
public @interface FieldMatch {
  String message() default "Fields does not match";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default{};

  String first();
  String second();

  @Target({ElementType.TYPE})
  @Retention(RetentionPolicy.RUNTIME)
  @Documented
  @interface List{
    FieldMatch[] value();
  }
}
