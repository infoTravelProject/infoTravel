package com.infotravel.controller;

import com.infotravel.entity.Notification;
import com.infotravel.entity.Preferences;
import com.infotravel.exception.NotificationNotFoundException;
import com.infotravel.exception.PreferencesNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.PreferencesService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/preference")
@Validated
public class PreferencesController {
    private final PreferencesService preferencesService;

    public PreferencesController(PreferencesService preferencesService) {
        this.preferencesService = preferencesService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getPreferences(@PathVariable int userId){
        try{
            Preferences preferences = preferencesService.getPreferencesByUserId(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Preferences retrieved successfully",
                    "data", preferences
            ));
        }catch (PreferencesNotFoundException ex){
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
            @RequestBody @Valid Preferences preferences
    ){
        try{
            Preferences createdPreferences = preferencesService.createPreferences(userId, preferences);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Preferences created successfully",
                    "data", createdPreferences
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
    public ResponseEntity<Object> updatePreferences(
            @PathVariable int userId,
            @RequestBody @Valid Preferences preferences
    ){
        try{
            Preferences updated = preferencesService.updatePreferences(userId, preferences);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Preferences updated successfully",
                    "data", updated
            ));
        }catch (PreferencesNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deletePreferences(@PathVariable int userId){
        try{
            preferencesService.deletePreferences(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.OK.value(),
                            "message", "Preferences for user with ID " + userId + " have been deleted"
                    ));
        }catch (PreferencesNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
}
