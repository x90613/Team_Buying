package com.example.back_end.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "host_form") // 修改為與數據庫表名一致
@Data
public class HostForm {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "host_id", nullable = false)
  private Integer hostId;

  @Column(name = "menu_id")
  private Integer menuId;

  @Column(name = "title", nullable = false, length = 100)
  private String title;

  @Column(name = "store_name", length = 100)
  private String storeName;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "status", nullable = false)
  private Integer status = 0;

  @Column(name = "start_time", nullable = false)
  private LocalDateTime startTime;

  @Column(name = "dead_time", nullable = false)
  private LocalDateTime deadTime;

  @Column(name = "host_contact_information", length = 255)
  private String hostContactInformation;

  @Column(name = "transfer_information", length = 255)
  private String transferInformation;

  @Column(name = "participant_information", nullable = false)
  private Boolean participantInformation;

  @Column(name = "link", length = 255)
  private String link;

  @Column(name = "open", nullable = false)
  private Boolean open;

  @Column(name = "image", columnDefinition = "LONGTEXT")
  private String image;
}
