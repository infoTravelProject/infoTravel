package com.infotravel.controller;

import com.infotravel.entity.PrivacySettings;
import com.infotravel.exception.PrivacySettingsNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.PrivacyService;
import com.sun.jdi.PrimitiveValue;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/privacy-settings")
@Validated
public class PrivacySettingsController {
    private final PrivacyService privacyService;

    public PrivacySettingsController(PrivacyService privacyService) {
        this.privacyService = privacyService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getPrivacySettings(@PathVariable int userId){
        try {
            PrivacySettings settings = privacyService.getPrivacySettingsByUserId(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Privacy settings retrieved successfully",
                    "data", settings
            ));
        } catch (PrivacySettingsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Object> createPrivacySettings(
            @PathVariable int userId,
            @RequestBody @Valid PrivacySettings privacySettings
            ){
        try{
            PrivacySettings createdPrivacySettings = privacyService.createPrivacySettings(userId, privacySettings);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Privacy settings created successfully",
                    "data", createdPrivacySettings
            ));
        }catch(UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }

    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> updatedPrivacySettings(
            @PathVariable int userId,
            @RequestBody @Valid PrivacySettings updatedSettings){

        try {
            PrivacySettings updated = privacyService.updatePrivacySettings(userId, updatedSettings);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Privacy settings updated successfully",
                    "data", updated
            ));
        } catch (PrivacySettingsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deletePrivacySettings(@PathVariable Integer userId){
        try{
            privacyService.deletePrivacySettings(userId);
            return ResponseEntity.status(HttpStatus.OK)
                        .body(Map.of(
                        "timestamp", System.currentTimeMillis(),
                        "status", HttpStatus.OK.value(),
                        "message", "Privacy settings for user with ID " + userId + " have been deleted"
            ));
        }catch(PrivacySettingsNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));

        }
    }
}
