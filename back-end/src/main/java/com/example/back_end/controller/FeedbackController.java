package com.example.back_end.controller;
import com.example.back_end.service.FeedbackService;
import com.example.back_end.dto.FeedbackRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public Map<String, String> createFeedback(@RequestBody FeedbackRequest feedbackDTO) {
        feedbackService.saveFeedback(feedbackDTO);
        return Map.of("message", "Feedback submitted successfully");
    }
}
