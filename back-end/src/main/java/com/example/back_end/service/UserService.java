package com.example.back_end.service;

import com.example.back_end.dao.UserDao;
import com.example.back_end.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {

  @Autowired private UserDao userDao;

  public UserInfo getUserInfoById(int id) {
    return userDao.getUserInfoById(id);
  }

  public boolean updateUserInfo(int userId, UserInfo userInfo) {
    return userDao.updateUserInfo(userId, userInfo);
  }
}
