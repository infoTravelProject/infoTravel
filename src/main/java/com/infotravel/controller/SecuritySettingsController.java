package com.infotravel.controller;

import com.infotravel.entity.SecuritySettings;
import com.infotravel.exception.SecuritySettingsNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.SecurityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/security-settings")
@Validated
public class SecuritySettingsController {
    private final SecurityService securitySettingsService;

    public SecuritySettingsController(SecurityService securitySettings) {
        this.securitySettingsService = securitySettings;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getSecuritySettings(@PathVariable int userId) {
        try {
            SecuritySettings settings = securitySettingsService.getSecuritySettingsByUserId(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Security settings retrieved successfully",
                    "data", settings
            ));
        }catch(SecuritySettingsNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
    @PostMapping("/{userId}")
    public ResponseEntity<Object> createSecuritySettings(
            @PathVariable int userId,
            @RequestBody @Valid SecuritySettings securitySettings) {
        try {
            SecuritySettings createdSecuritySettings = securitySettingsService.createSecuritySettings(userId, securitySettings);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Security settings created successfully",
                    "data", createdSecuritySettings
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
    public ResponseEntity<Object> updateSecuritySettings(
            @PathVariable int userId,
            @RequestBody @Valid SecuritySettings updatedSettings) {
        try{
            SecuritySettings updated = securitySettingsService.updateSecuritySettings(userId, updatedSettings);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Security settings updated successfully",
                    "data", updated
            ));
        }catch(SecuritySettingsNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deleteSecuritySettings(@PathVariable Integer userId) {
        try {
            securitySettingsService.deleteSecuritySettings(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.OK.value(),
                            "message", "Security settings for user with ID " + userId + " have been deleted"
                    ));
        } catch (SecuritySettingsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

}
