package com.example.back_end.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "UserFeedBack")
public class UserFeedBack {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Feedback ID

  @Column(name = "userId", nullable = false)
  private Integer userId; // Foreign Key, references User table

  @Column(name = "hostId", nullable = false)
  private Integer hostId; // Foreign Key, references User table (host)

  @Column(name = "host_form_id", nullable = false)
  private Integer hostFormId; // Foreign Key, references HostForm table (host)

  @Column(name = "content", nullable = false, columnDefinition = "TEXT")
  private String content; // Feedback content

  @Column(name = "score", nullable = false)
  private Integer score; // Rating score

  @Column(name = "datetime", nullable = false, columnDefinition = "TIMESTAMP")
  private LocalDateTime datetime; // Feedback timestamp

  // No-argument constructor for JPA
  public UserFeedBack() {}

  // All-arguments constructor for convenience
  public UserFeedBack(
      Integer userId,
      Integer hostId,
      Integer hostFormId,
      String content,
      Integer score,
      LocalDateTime datetime) {
    this.userId = userId;
    this.hostId = hostId;
    this.hostFormId = hostFormId;
    this.content = content;
    this.score = score;
    this.datetime = datetime;
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public Integer getHostId() {
    return hostId;
  }

  public void setHostId(Integer hostId) {
    this.hostId = hostId;
  }

  public Integer getHostFormId() {
    return hostFormId;
  }

  public void setHostFormId(Integer hostFormId) {
    this.hostFormId = hostFormId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Integer getScore() {
    return score;
  }

  public void setScore(Integer score) {
    this.score = score;
  }

  public LocalDateTime getDatetime() {
    return datetime;
  }

  public void setDatetime(LocalDateTime datetime) {
    this.datetime = datetime;
  }
}
