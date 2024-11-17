package com.example.back_end.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "HostForm")
public class HostForm {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Host Form ID

  @Column(name = "hostId", nullable = false)
  private Integer hostId; // Foreign Key, references User table

  @Column(name = "menuId", nullable = false)
  private Integer menuId; // Foreign Key, references Menu table

  @Column(name = "title", nullable = false, length = 100)
  private String title; // Title of the buying activity

  @Column(name = "description", columnDefinition = "TEXT")
  private String description; // Detailed description (nullable)

  @Column(name = "status", nullable = false)
  private Integer status = 0; // Status of the form, default is 0

  @Column(name = "startTime", nullable = false)
  private LocalDateTime startTime; // Activity start time

  @Column(name = "deadTime", nullable = false)
  private LocalDateTime deadTime; // Activity end time

  @Column(name = "participantInformation", nullable = false)
  private Boolean participantInformation; // Whether participant information is required

  @Column(name = "link", length = 255)
  private String link; // Form sharing link (nullable)

  @Column(name = "open", nullable = false)
  private Boolean open; // Whether the form is open

  // No-argument constructor for JPA
  public HostForm() {}

  // All-arguments constructor for convenience
  public HostForm(
      Integer hostId,
      Integer menuId,
      String title,
      String description,
      Integer status,
      LocalDateTime startTime,
      LocalDateTime deadTime,
      Boolean participantInformation,
      String link,
      Boolean open) {
    this.hostId = hostId;
    this.menuId = menuId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.startTime = startTime;
    this.deadTime = deadTime;
    this.participantInformation = participantInformation;
    this.link = link;
    this.open = open;
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getHostId() {
    return hostId;
  }

  public void setHostId(Integer hostId) {
    this.hostId = hostId;
  }

  public Integer getMenuId() {
    return menuId;
  }

  public void setMenuId(Integer menuId) {
    this.menuId = menuId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public LocalDateTime getStartTime() {
    return startTime;
  }

  public void setStartTime(LocalDateTime startTime) {
    this.startTime = startTime;
  }

  public LocalDateTime getDeadTime() {
    return deadTime;
  }

  public void setDeadTime(LocalDateTime deadTime) {
    this.deadTime = deadTime;
  }

  public Boolean getParticipantInformation() {
    return participantInformation;
  }

  public void setParticipantInformation(Boolean participantInformation) {
    this.participantInformation = participantInformation;
  }

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

  public Boolean getOpen() {
    return open;
  }

  public void setOpen(Boolean open) {
    this.open = open;
  }
}
