package com.example.back_end.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "User")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, User ID

  @Column(name = "username", nullable = false, length = 50)
  private String username; // User’s login name

  @Column(name = "email", nullable = false, length = 255)
  private String email; // User’s email

  @Column(name = "password", nullable = false, length = 255)
  private String password; // User’s hashed password

  @Column(name = "phoneNumber", nullable = true, length = 20)
  private String phoneNumber; // User’s contact number

  @Column(name = "createdAt", nullable = false)
  private LocalDateTime createdAt; // Account creation time, default current timestamp

  // No-argument constructor for JPA
  public User() {}

  // All-arguments constructor for convenience
  public User(String username, String email, String password, String phoneNumber) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.createdAt = LocalDateTime.now(); // Sets the creation time to current time
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
