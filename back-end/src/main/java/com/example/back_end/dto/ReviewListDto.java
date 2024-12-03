package com.example.back_end.dto;

public class ReviewListDto {
  private String name;
  private String datetime;
  private int star;
  private int hostFormId;

  // Getters and Setters
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDatetime() {
    return datetime;
  }

  public void setDatetime(String datetime) {
    this.datetime = datetime;
  }

  public int getStar() {
    return star;
  }

  public void setStar(int star) {
    this.star = star;
  }

  public int getHostFormId() {
    return hostFormId;
  }

  public void setHostFormId(int hostFormId) {
    this.hostFormId = hostFormId;
  }
}
