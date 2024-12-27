package com.infotravel.controller;

import com.infotravel.entity.Notification;
import com.infotravel.entity.Subscription;
import com.infotravel.exception.NotificationNotFoundException;
import com.infotravel.exception.SubscriptionNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getNotification(@PathVariable int userId){
        try{
            Notification notification = notificationService.getNotificationByUserId(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Subscription retrieved successfully",
                    "data", notification
            ));
        }catch (NotificationNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Object> createNotification(
            @PathVariable int userId,
            @RequestBody @Valid Notification notification
    ){
        try {
            Notification createdNotification = notificationService.createNotification(userId, notification);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Notification created successfully",
                    "data", createdNotification
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
    public ResponseEntity<Object> updateNotification(
            @PathVariable int userId,
            @RequestBody @Valid Notification notification
    ){
        try{
            Notification updated = notificationService.updateNotification(userId, notification);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Notification updated successfully",
                    "data", updated
            ));
        }catch (NotificationNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deleteNotification(@PathVariable int userId){
        try{
            notificationService.deleteNotification(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.OK.value(),
                            "message", "Notification for user with ID " + userId + " have been deleted"
                    ));
        }catch (NotificationNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
}
