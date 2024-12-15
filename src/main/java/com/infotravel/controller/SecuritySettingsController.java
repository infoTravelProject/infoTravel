package com.infotravel.controller;

import com.infotravel.entity.SecuritySettings;
import com.infotravel.exception.SecuritySettingsNotFoundException;
import com.infotravel.service.SecurityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/security-settings")
public class SecuritySettingsController {
    private final SecurityService securitySettingsService;

    public SecuritySettingsController(SecurityService securitySettings) {
        this.securitySettingsService = securitySettings;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<SecuritySettings> getSecuritySettings(@PathVariable int userId) {
        SecuritySettings settings = securitySettingsService.getSecuritySettingsByUserId(userId);
        return ResponseEntity.ok(settings);
    }
    @PostMapping("/user/{userId}")
    public ResponseEntity<SecuritySettings> createSecuritySettings(
            @PathVariable int userId,
            @RequestBody @Valid SecuritySettings securitySettings) {
        System.out.println("SecuritySettings received: " + securitySettings.getEnable2FA());
        SecuritySettings createdSecuritySettings = securitySettingsService.createSecuritySettings(userId, securitySettings);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSecuritySettings);
    }


    @PutMapping("/{userId}")
    public ResponseEntity<SecuritySettings> updateSecuritySettings(
            @PathVariable int userId,
            @RequestBody @Valid SecuritySettings updatedSettings) {
        SecuritySettings updated = securitySettingsService.updateSecuritySettings(userId, updatedSettings);
        return ResponseEntity.ok(updated);
    }
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteSecuritySettings(@PathVariable Integer userId) {
        try {
            securitySettingsService.deleteSecuritySettings(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SecuritySettingsNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
