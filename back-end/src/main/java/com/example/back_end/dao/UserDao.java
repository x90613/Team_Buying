package com.example.back_end.dao;

import com.example.back_end.entity.User;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {

  private static final Logger log = LoggerFactory.getLogger(UserDAO.class);
  private final JdbcTemplate jdbcTemplate;

  private static final String INSERT_SQL =
      "INSERT INTO user (username, email, password, phone_number, created_at) VALUES (?, ?, ?, ?,"
          + " ?)";

  private static final String SELECT_BY_USERNAME_SQL = "SELECT * FROM user WHERE username = ?";

  public UserDAO(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public User save(User user) {
    try {
      log.info("Saving user: {}", user.getUsername());
      KeyHolder keyHolder = new GeneratedKeyHolder();

      // 確保 createdAt 一定有值
      LocalDateTime now = LocalDateTime.now();
      user.setCreatedAt(now);

      jdbcTemplate.update(
          connection -> {
            PreparedStatement ps =
                connection.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS);
            int paramIndex = 1;
            ps.setString(paramIndex++, user.getUsername());
            ps.setString(paramIndex++, user.getEmail());
            ps.setString(paramIndex++, user.getPassword());
            // 使用 setObject，如果 phoneNumber 為 null 也不會有問題
            ps.setObject(paramIndex++, user.getPhoneNumber());
            ps.setTimestamp(paramIndex, Timestamp.valueOf(now));
            return ps;
          },
          keyHolder);

      Number key = keyHolder.getKey();
      if (key != null) {
        user.setId(key.intValue());
        log.debug("Saved user with id: {}", user.getId());
      }
      return user;

    } catch (Exception e) {
      log.error("Error saving user: {}, error: {}", user.getUsername(), e.getMessage(), e);
      throw new RuntimeException("Error saving user: " + e.getMessage(), e);
    }
  }

  public User findByUsername(String username) {
    try {
      log.debug("Finding user by username: {}", username);
      return jdbcTemplate.queryForObject(SELECT_BY_USERNAME_SQL, this::mapRowToUser, username);
    } catch (Exception e) {
      log.debug("User not found: {}", username);
      return null;
    }
  }

  private User mapRowToUser(ResultSet rs, int rowNum) throws java.sql.SQLException {
    User user = new User();
    user.setId(rs.getInt("id"));
    user.setUsername(rs.getString("username"));
    user.setEmail(rs.getString("email"));
    user.setPassword(rs.getString("password"));
    user.setPhoneNumber(rs.getString("phone_number"));

    // 處理 created_at，確保不會有 null
    Timestamp createdAt = rs.getTimestamp("created_at");
    user.setCreatedAt(createdAt != null ? createdAt.toLocalDateTime() : LocalDateTime.now());

    return user;
  }
}
