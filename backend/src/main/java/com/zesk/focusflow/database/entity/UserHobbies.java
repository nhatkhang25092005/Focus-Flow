package com.zesk.focusflow.database.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;;
@Entity
@Table(name = "user_hobbies")
public class UserHobbies {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userHobbyId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false )
  private User user;

  @ManyToOne
  @JoinColumn(name = "hobby_id", nullable = false)
  private Hobbies hobbies;

  public UserHobbies(){}

  public Long getUserHobbiesId(){return userHobbyId;}
  public User getUser(){return user;}
  public Hobbies getHobbies(){return hobbies;}

}
