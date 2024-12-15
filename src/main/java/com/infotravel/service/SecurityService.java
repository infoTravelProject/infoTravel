package com.infotravel.service;

import com.infotravel.entity.SecuritySettings;
import com.infotravel.entity.User;
import com.infotravel.exception.SecuritySettingsNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.SecuritySettingsRepository;
import com.infotravel.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {
    private final SecuritySettingsRepository securitySettingsRepository;
    private final UserRepository userRepository;

    public SecurityService(SecuritySettingsRepository securitySettingsRepository, UserRepository userRepository) {
        this.securitySettingsRepository = securitySettingsRepository;
        this.userRepository = userRepository;
    }

    public SecuritySettings getSecuritySettingsByUserId(int userId) {
        return securitySettingsRepository.findByUserUserId(userId)
                .orElseThrow(() -> new SecuritySettingsNotFoundException("Security settings for user with id " + userId + " not found"));
    }

    public SecuritySettings createSecuritySettings(int userId, SecuritySettings securitySettings) {
        // Fetch the user based on the provided userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));

        // Associate the user with the security settings
        securitySettings.setUser(user);

        return securitySettingsRepository.save(securitySettings);
    }
    public SecuritySettings updateSecuritySettings(int userId, SecuritySettings updatedSettings) {
        SecuritySettings existingSettings = securitySettingsRepository.findByUserUserId(userId)
                .orElseThrow(() -> new SecuritySettingsNotFoundException("Security settings for user with id " + userId + " not found"));

        // Update the fields
        existingSettings.setEnable2FA(updatedSettings.getEnable2FA());
        existingSettings.setEmail(updatedSettings.getEmail());
        existingSettings.setPhone(updatedSettings.getPhone());
        existingSettings.setDeviceList(updatedSettings.getDeviceList());

        return securitySettingsRepository.save(existingSettings);
    }
    public void deleteSecuritySettings(int userId){
        if(securitySettingsRepository.existsByUser_UserId(userId)){
            securitySettingsRepository.deleteByUser_UserId(userId);
        }else{
            throw new SecuritySettingsNotFoundException("Security settings not found for user with id " + userId);
        }
    }
}
