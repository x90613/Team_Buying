package com.example.back_end.dto;

public class CreateHostFormDTO {
    private String title;
    private Boolean others;
    private String storeName;
    private String description;
    private String deadline;
    private String hostContactInformation;
    private String transferInformation;
    private Integer menuId;
    private String image;
    private Boolean open;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Boolean getOthers() { return others; }
    public void setOthers(Boolean others) { this.others = others; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public String getHostContactInformation() { return hostContactInformation; }
    public void setHostContactInformation(String hostContactInformation) { this.hostContactInformation = hostContactInformation; }

    public String getTransferInformation() { return transferInformation; }
    public void setTransferInformation(String transferInformation) { this.transferInformation = transferInformation; }

    public Integer getMenuId() { return menuId; }
    public void setMenuId(Integer menuId) { this.menuId = menuId; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public boolean getOpen() { return open; }
    public void setOpen(boolean open) { this.open = open; }
}