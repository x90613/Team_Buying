package com.example.back_end.service;

import com.example.back_end.dao.UserDao;
import com.example.back_end.dto.ReviewDto;
import com.example.back_end.dto.ReviewListDto;
import com.example.back_end.dto.UserHistoryDto;
import com.example.back_end.dto.UserInfoDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {

  @Autowired private UserDao userDao;

  public UserInfoDto getUserInfoById(int userId) {
    // Retrieve user information based on the provided user ID
    return userDao.getUserInfoByUserId(userId);
  }

  public boolean updateUserInfo(int userId, UserInfoDto userInfo) {
    // Update user information for the specified user ID and return the operation result
    if (userDao.getUserInfoByUserId(userId) == null) {
      return false;
    } else {
      userDao.updateUserInfoByUserId(userId, userInfo);
      return true;
    }
  }

  public List<UserHistoryDto.HostHistory> getHostHistoryByUserId(int userId) {
    // Retrieve Host history records from the data layer
    return userDao.getHostHistoryByUserId(userId);
  }

  public List<UserHistoryDto.ParticipantHistory> getParticipantHistoryByUserId(int userId) {
    // Retrieve Participant history records from the data layer
    return userDao.getParticipantHistoryByUserId(userId);
  }

  public List<UserHistoryDto.HostHistory> getNowHostingByUserId(int userId) {
    // Retrieve current Host records from the data layer
    return userDao.getNowHostingByUserId(userId);
  }

  public List<UserHistoryDto.ParticipantHistory> getNowBuyingByUserId(int userId) {
    // Retrieve current Participant records from the data layer
    return userDao.getNowBuyingByUserId(userId);
  }

  public List<ReviewListDto> getReviewListByUserId(int userId) {

    return userDao.getReviewListByUserId(userId);
  }

  public List<ReviewDto> getReviewByHostFormId(int hostFormId) {

    return userDao.getReviewByHostFormId(hostFormId);
  }
}
