package com.example.back_end.dao;

import com.example.back_end.entity.UserFeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDAO extends JpaRepository<UserFeedBack, Integer> {}
