package com.example.back_end.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ParticipantForm")
public class ParticipantForm {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Participant Form ID

  @Column(name = "hostFormId", nullable = false)
  private Integer hostFormId; // Foreign Key, references HostForm table

  @Column(name = "participantId", nullable = false)
  private Integer participantId; // Foreign Key, references User table

  @Column(name = "username", nullable = false, length = 50)
  private String username; // Participant's username

  @Column(name = "status", nullable = false)
  private Integer status; // Status of participation

  @Column(name = "paymentStatus", nullable = false)
  private Integer paymentStatus; // Status of payment

  @Column(
      name = "joinedAt",
      nullable = false,
      columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime joinedAt; // Join time, default current timestamp

  // No-argument constructor for JPA
  public ParticipantForm() {}

  // All-arguments constructor for convenience
  public ParticipantForm(
      Integer hostFormId,
      Integer participantId,
      String username,
      Integer status,
      Integer paymentStatus) {
    this.hostFormId = hostFormId;
    this.participantId = participantId;
    this.username = username;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.joinedAt = LocalDateTime.now(); // Sets the join time to current time
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getHostFormId() {
    return hostFormId;
  }

  public void setHostFormId(Integer hostFormId) {
    this.hostFormId = hostFormId;
  }

  public Integer getParticipantId() {
    return participantId;
  }

  public void setParticipantId(Integer participantId) {
    this.participantId = participantId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public Integer getPaymentStatus() {
    return paymentStatus;
  }

  public void setPaymentStatus(Integer paymentStatus) {
    this.paymentStatus = paymentStatus;
  }

  public LocalDateTime getJoinedAt() {
    return joinedAt;
  }

  public void setJoinedAt(LocalDateTime joinedAt) {
    this.joinedAt = joinedAt;
  }
}
