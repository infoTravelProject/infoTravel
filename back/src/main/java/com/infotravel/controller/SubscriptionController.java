package com.infotravel.controller;

import com.infotravel.entity.Subscription;
import com.infotravel.exception.SubscriptionNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.SubscriptionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/subscription")
@Validated
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getSubscription(@PathVariable int userId){
        try{
            Subscription subscription = subscriptionService.getSubscriptionByUserId(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Subscription retrieved successfully",
                    "data", subscription
            ));
        }catch (SubscriptionNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Object> createSubscription(
            @PathVariable int userId,
            @RequestBody @Valid Subscription subscription
    ){
        try {
            Subscription createdSubscription = subscriptionService.createSubscription(userId, subscription);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Subscription created successfully",
                    "data", createdSubscription
            ));
        }catch (UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> updateSubscription(
            @PathVariable int userId,
            @RequestBody @Valid Subscription subscription
    ){
        try{
            Subscription updated = subscriptionService.updateSubscription(userId, subscription);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Subscription updated successfully",
                    "data", updated
            ));
        }catch (SubscriptionNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deleteSubscription(@PathVariable int userId){
        try{
            subscriptionService.deleteSubscription(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.OK.value(),
                            "message", "Subscription for user with ID " + userId + " have been deleted"
                    ));
        }catch (SubscriptionNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
}
