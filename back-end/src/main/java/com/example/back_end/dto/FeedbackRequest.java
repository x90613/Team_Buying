package com.example.back_end.dto;

public class FeedbackRequest {
    private String userId;
    private String hostId;
    private String hostFormId;
    private int score;
    private String content;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getHostId() {
        return hostId;
    }

    public void setHostId(String hostId) {
        this.hostId = hostId;
    }

    public String getHostFormId() {
        return hostFormId;
    }

    public void setHostFormId(String hostFormId) {
        this.hostFormId = hostFormId;
    }

    public int getStar() {
        return score;
    }

    public void setStar(int score) {
        this.score = score;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

