package com.example.back_end.dao;
import org.springframework.stereotype.Repository;
import com.example.back_end.entity.UserFeedBack;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface FeedbackDAO extends JpaRepository<UserFeedBack, Integer> {
}
