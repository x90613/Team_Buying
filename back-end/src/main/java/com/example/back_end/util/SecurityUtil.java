package com.example.back_end.util;

import com.example.back_end.dao.UserDAO;
import com.example.back_end.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {
    private static final Logger log = LoggerFactory.getLogger(SecurityUtil.class);
    private final UserDAO userDAO;

    public SecurityUtil(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                log.warn("No authentication found in security context");
                return null;
            }

            // 從 Authentication 中獲取用戶名
            String username = authentication.getName();
            log.debug("Found username in security context: {}", username);

            // 從數據庫查詢用戶信息
            User user = userDAO.findByUsername(username);
            if (user == null) {
                log.warn("User not found in database for username: {}", username);
                return null;
            }

            return user;
        } catch (Exception e) {
            log.error("Error getting current user", e);
            return null;
        }
    }
}