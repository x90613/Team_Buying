package com.example.back_end.service;

import com.example.back_end.dao.NotifyDao;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotifyService {
  private final SimpMessagingTemplate messagingTemplate;
  private final NotifyDao notifyDao;

  public NotifyService(SimpMessagingTemplate messagingTemplate, NotifyDao notifyDao) {
    this.messagingTemplate = messagingTemplate;
    this.notifyDao = notifyDao;
  }

  public Integer getHostId(Integer hostFormId) {
    return notifyDao.getHostId(hostFormId);
  }

  public void notifyHost(Integer hostId, String message) {
    // 發送消息到指定的 WebSocket topic

    messagingTemplate.convertAndSend("/topic/notifications/" + hostId, message);
  }
}
