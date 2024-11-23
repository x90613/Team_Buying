package com.example.back_end.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Menu")
public class Menu {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Menu ID

  @Lob
  @Column(name = "img", columnDefinition = "MEDIUMBLOB", nullable = false)
  private byte[] img; // Menu image code

  @Column(name = "name", nullable = false, length = 100)
  private String name; // Menu name

  // No-argument constructor for JPA
  public Menu() {}

  // All-arguments constructor for convenience
  public Menu(byte[] img, String name) {
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

  public byte[] getImg() {
    return img;
  }

  public void setImg(byte[] img) {
    this.img = img;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
