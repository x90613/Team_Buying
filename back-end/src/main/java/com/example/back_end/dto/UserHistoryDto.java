package com.example.back_end.dto;

import java.util.List;

public class UserHistoryDto {

  private List<HostHistory> host;
  private List<ParticipantHistory> participant;

  public List<HostHistory> getHost() {
    return host;
  }

  public void setHost(List<HostHistory> host) {
    this.host = host;
  }

  public List<ParticipantHistory> getParticipant() {
    return participant;
  }

  public void setParticipant(List<ParticipantHistory> participant) {
    this.participant = participant;
  }

  public static class HostHistory {
    private String name;
    private String datetime;
    private String status;
    private String hostformId;

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

    public String getStatus() {
      return status;
    }

    public void setStatus(String status) {
      this.status = status;
    }

    public String getHostformId() {
      return hostformId;
    }

    public void setHostformId(String hostformId) {
      this.hostformId = hostformId;
    }
  }

  public static class ParticipantHistory {
    private String name;
    private String datetime;
    private String paymentStatus;
    private String hostformId;

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

    public String getPaymentStatus() {
      return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
      this.paymentStatus = paymentStatus;
    }

    public String getHostformId() {
      return hostformId;
    }

    public void setHostformId(String hostformId) {
      this.hostformId = hostformId;
    }
  }
}
