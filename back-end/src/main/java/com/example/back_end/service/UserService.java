package com.example.back_end.service;

import com.example.back_end.dao.UserDao;
import com.example.back_end.dto.UserHistory;
import com.example.back_end.dto.UserInfo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {

  @Autowired private UserDao userDao;

  public UserInfo getUserInfoById(int id) {
    // Retrieve user information based on the provided user ID
    return userDao.getUserInfoByUserId(id);
  }

  public boolean updateUserInfo(int userId, UserInfo userInfo) {
    // Update user information for the specified user ID and return the operation result
    return userDao.updateUserInfoByUserId(userId, userInfo);
  }

  public List<UserHistory.HostHistory> getHostHistoryByUserId(int userId) {
    // Retrieve Host history records from the data layer
    return userDao.getHostHistoryByUserId(userId);
  }

  public List<UserHistory.ParticipantHistory> getParticipantHistoryByUserId(int userId) {
    // Retrieve Participant history records from the data layer
    return userDao.getParticipantHistoryByUserId(userId);
  }

  public List<UserHistory.HostHistory> getNowHostingByUserId(int userId) {
    // Retrieve current Host records from the data layer
    return userDao.getNowHostingByUserID(userId);
  }
}
