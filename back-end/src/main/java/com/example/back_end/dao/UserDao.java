package com.example.back_end.dao;

import com.example.back_end.dto.UserInfo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {

  @Autowired private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

  public UserInfo getUserInfoById(Integer userId) {
    String sql = "SELECT username, email, phone_number FROM user WHERE id = :userId";
    //        System.out.println("receive getUserInfo Dao" + userId);

    Map<String, Object> map = new HashMap<>();
    map.put("userId", userId);

    List<UserInfo> list =
        namedParameterJdbcTemplate.query(sql, map, new BeanPropertyRowMapper<>(UserInfo.class));

    //        System.out.println(list.get(0).getUsername());
    //        System.out.println(list.get(0).getPhoneNumber());
    //        System.out.println(list.get(0).getEmail());

    if (list.size() > 0) {
      return list.get(0);
    }
    return null;
  }

  public Boolean updateUserInfo(int userId, UserInfo userInfo) {
    String sql =
        "UPDATE user SET username = :username, email = :email, phone_number = :phoneNumber WHERE id"
            + " = :userId";

    Map<String, Object> params = new HashMap<>();
    params.put("username", userInfo.getUsername());
    params.put("email", userInfo.getEmail());
    params.put("phoneNumber", userInfo.getPhoneNumber());
    params.put("userId", userId);

    return namedParameterJdbcTemplate.update(sql, params) > 0; // 返回是否更新
  }
}
