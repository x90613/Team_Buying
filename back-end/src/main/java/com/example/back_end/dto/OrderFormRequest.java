package com.example.back_end.dto;

import java.util.List;

public class OrderFormRequest {
  private Integer hostformId; // Foreign Key, references HostForm table
  private Integer participantId; // Foreign Key, references User table
  private Boolean anonymous; // Whether the participant is anonymous
  private List<String> order; // List of products
  private List<String> quantity; // List of quantities
  private List<Double> price; // List of prices

  // Getters and Setters
  public Integer getHostformId() {
    return hostformId;
  }

  public void setHostformId(Integer hostformId) {
    this.hostformId = hostformId;
  }

  public Integer getParticipantId() {
    return participantId;
  }

  public void setParticipantId(Integer participantId) {
    this.participantId = participantId;
  }

  public Boolean getAnonymous() {
    return anonymous;
  }

  public void setAnonymous(Boolean anonymous) {
    this.anonymous = anonymous;
  }

  public List<String> getOrder() {
    return order;
  }

  public void setOrder(List<String> order) {
    this.order = order;
  }

  public List<String> getQuantity() {
    return quantity;
  }

  public void setQuantity(List<String> quantity) {
    this.quantity = quantity;
  }

  public List<Double> getPrice() {
    return price;
  }

  public void setPrice(List<Double> price) {
    this.price = price;
  }
}
