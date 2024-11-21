package com.example.back_end.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Menu")
public class Menu {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Menu ID

  @Column(name = "img", columnDefinition = "TEXT", nullable = false)
  private String img; // Menu image code

  @Column(name = "name", nullable = false, length = 100)
  private String name; // Menu name

  // No-argument constructor for JPA
  public Menu() {}

  // All-arguments constructor for convenience
  public Menu(String img, String name) {
    this.img = img;
    this.name = name;
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getImg() {
    return img;
  }

  public void setImg(String img) {
    this.img = img;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
