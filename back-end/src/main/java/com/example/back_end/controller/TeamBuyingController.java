package com.example.back_end.controller;

import com.example.back_end.service.TeamBuyingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/TeamBuyings/")
public class TeamBuyingController {

    private final TeamBuyingService teamBuyingService;
    public TeamBuyingController(TeamBuyingService teamBuyingService) {
        this.teamBuyingService = teamBuyingService;
    }

    @GetMapping
    public ResponseEntity<Object> getAllTeamBuyings() {
        List<Map<String, Object>> teamBuyings = teamBuyingService.getAllTeamBuyings();
        if (teamBuyings == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Internal Server Error", "message", "not found any teambuying"));
        }
        return ResponseEntity.ok(teamBuyings);
    }
}
