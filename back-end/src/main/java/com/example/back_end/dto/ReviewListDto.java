package com.example.back_end.dto;

public class ReviewListDto {
  private String name;
  private String date;
  private int star;
  private int hostFormId;

  // Getters and Setters
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
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
