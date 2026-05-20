package com.zesk.focusflow.database.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;;
@Entity
@Table(name = "hobbies")
public class Hobbies {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "hobby_id")
  private Long hobbyId;

  @Column(name = "name")
  private String name;

  public Hobbies(){}

  public Long getHobbyId(){return hobbyId;}
  public String getName(){return name;}
}
