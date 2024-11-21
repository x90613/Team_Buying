package com.example.back_end.controller;


import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.service.ManageService;

@RestController
@RequestMapping("/api/management")
public class ManageController {

    private final ManageService manageService;
    public ManageController(ManageService manageService) {
        this.manageService = manageService;
    }

    @PutMapping("/transfer/{orderId}")
    public ResponseEntity<String> updateTransferStatus(@PathVariable Integer orderId, @RequestBody Map<String, Integer> requestBody) {
        int paymentStatus = requestBody.get("paymentStatus");
        boolean updated = manageService.updateTransferStatus(orderId, paymentStatus);
        if (updated) {
            return ResponseEntity.ok("Transfer status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update transfer status.");
        }
    }

    // Not be used in current setting
    @PutMapping("/order/{orderId}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Integer orderId, @RequestBody Map<String, Integer> requestBody) {
        int status = requestBody.get("status");
        boolean updated = manageService.updateOrderStatus(orderId, status);
        if (updated) {
            return ResponseEntity.ok("Order status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update order status.");
        }
    }

    @GetMapping("/finish/{hostformId}")
    public ResponseEntity<String> finishTeamBuying(@PathVariable Integer hostformId) {
        boolean finished = manageService.finishTeamBuying(hostformId);
        if (finished) {
            return ResponseEntity.ok("Team buying finished successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to finish team buying.");
        }
    }
}
