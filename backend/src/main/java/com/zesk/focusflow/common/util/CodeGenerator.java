package com.zesk.focusflow.common.util;

import java.util.Random;

public class CodeGenerator {
  public static String generate(){
    Random random = new Random();
    return String.valueOf(
      100000 + random.nextInt(900000)
    );
  }
}
