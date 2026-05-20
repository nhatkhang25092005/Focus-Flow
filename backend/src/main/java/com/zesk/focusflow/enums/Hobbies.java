package com.zesk.focusflow.enums;

public enum Hobbies {
  READING("Reading"),
  GAMING("Gaming"),
  CODING("Coding"),
  PHOTOGRAPHY("Photography"),
  COOKING("Cooking"),
  TRAVELING("Traveling"),
  DRAWING("Drawing"),
  PAINTING("Painting"),
  MUSIC("Music"),
  PLAYING_PIANO("Playing Piano"),
  WATCHING_MOVIES("Watching Movies"),
  HIKING("Hiking"),
  CYCLING("Cycling"),
  SWIMMING("Swimming"),
  GYM("Gym"),
  CHESS("Chess"),
  FISHING("Fishing"),
  WRITING("Writing"),
  GARDENING("Gardening"),
  LEARNING_LANGUAGES("Learning Languages");

  private final String displayName;

  Hobbies(String displayName) {
    this.displayName = displayName;
  }

  public String getDisplayName() {
    return displayName;
  }
}

