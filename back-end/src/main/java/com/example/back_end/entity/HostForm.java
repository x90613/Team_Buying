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

  @Column(name = "menuId", nullable = true)
  private Integer menuId; // Foreign Key, references Menu table (nullable)

  @Column(name = "store_name", nullable = false, length = 100)
  private String storeName; // Store name

  @Column(name = "title", nullable = false, length = 100)
  private String title; // Title of the buying activity

  @Column(name = "description", columnDefinition = "TEXT")
  private String description; // Detailed description (nullable)

  @Column(name = "status", nullable = false)
  private Integer status = 0; // Status of the form, default is 0

  @Column(
      name = "startTime",
      nullable = false,
      columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime startTime; // Activity start time

  @Column(name = "deadTime", nullable = true, columnDefinition = "DATETIME")
  private LocalDateTime deadTime; // Activity end time (nullable)

  @Column(name = "transfer_information", columnDefinition = "TEXT", nullable = false)
  private String transferInformation; // Host transfer information

  @Column(name = "contact_information", nullable = false)
  private String contactInformation; // Host contact information

  @Column(name = "img", columnDefinition = "TEXT")
  private String img; // Menu image (nullable)

  @Column(name = "open", nullable = false)
  private Boolean open; // Whether the form is public

  // No-argument constructor for JPA
  public HostForm() {}

  // All-arguments constructor for convenience
  public HostForm(
      Integer hostId,
      Integer menuId,
      String storeName,
      String title,
      String description,
      Integer status,
      LocalDateTime startTime,
      LocalDateTime deadTime,
      String transferInformation,
      String contactInformation,
      String img,
      Boolean open) {
    this.hostId = hostId;
    this.menuId = menuId;
    this.storeName = storeName;
    this.title = title;
    this.description = description;
    this.status = status;
    this.startTime = startTime;
    this.deadTime = deadTime;
    this.transferInformation = transferInformation;
    this.contactInformation = contactInformation;
    this.img = img;
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

  public String getStoreName() {
    return storeName;
  }

  public void setStoreName(String storeName) {
    this.storeName = storeName;
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

  public String getTransferInformation() {
    return transferInformation;
  }

  public void setTransferInformation(String transferInformation) {
    this.transferInformation = transferInformation;
  }

  public String getContactInformation() {
    return contactInformation;
  }

  public void setContactInformation(String contactInformation) {
    this.contactInformation = contactInformation;
  }

  public String getImg() {
    return img;
  }

  public void setImg(String img) {
    this.img = img;
  }

  public Boolean getOpen() {
    return open;
  }

  public void setOpen(Boolean open) {
    this.open = open;
  }
}
