package com.infotravel.service;

import com.infotravel.entity.PrivacySettings;
import com.infotravel.entity.User;
import com.infotravel.exception.PrivacySettingsNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.PrivacySettingsRepository;
import com.infotravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;


@Service
public class PrivacyService {
    private final PrivacySettingsRepository privacySettingsRepository;
    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(PrivacySettings.class);

    public PrivacyService(PrivacySettingsRepository privacySettingsRepository, UserRepository userRepository) {
        this.privacySettingsRepository = privacySettingsRepository;
        this.userRepository = userRepository;
    }

    public PrivacySettings getPrivacySettingsByUserId(int userId){
        logger.info("Fetching privacy settings for user ID: {}", userId);
        return privacySettingsRepository.findByUserUserId(userId)
                .orElseThrow(()->{
                    logger.error("Privacy settings for user ID {} not found", userId);
                    return new PrivacySettingsNotFoundException("Privacy settings for user with id "+userId+" not found");
                });

    }

    public PrivacySettings createPrivacySettings(int userId, PrivacySettings privacySettings){
        logger.info("Creating privacy settings for user ID: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(()-> {
                    logger.error("User with ID {} not found", userId);
                  return  new UserNotFoundException("User with id "+userId+" not found");
                });

        privacySettings.setUser(user);

        return privacySettingsRepository.save(privacySettings);
    }

    public PrivacySettings updatePrivacySettings(int userId, PrivacySettings updatedSettings){
        logger.info("Updating privacy settings for user ID: {}", userId);
        PrivacySettings existingSettings = privacySettingsRepository.findByUserUserId(userId)
                .orElseThrow(()->{
                    logger.error("Privacy settings for user ID {} not found", userId);
                  return new PrivacySettingsNotFoundException("Privacy settings for user with id "+userId+" not found");
                });

        existingSettings.setPersonalizedAds(updatedSettings.isPersonalizedAds());
        existingSettings.setLocationTracking(updatedSettings.isLocationTracking());
        existingSettings.setPersonalizedNews(updatedSettings.isPersonalizedNews());
        existingSettings.setPublicProfile(updatedSettings.isPublicProfile());
        return privacySettingsRepository.save(existingSettings);
    }

    @Transactional
    public void deletePrivacySettings(int userId){
        logger.info("Deleting privacy settings for user ID: {}", userId);
        if(privacySettingsRepository.existsByUser_UserId(userId)){
            logger.info("Privacy settings for user ID {} deleted successfully", userId);
            privacySettingsRepository.deleteByUser_UserId(userId);
        }else{
            logger.error("Privacy settings for user ID {} not found", userId);
           throw new PrivacySettingsNotFoundException("Privacy settings for user with id "+userId+" not found");
        }
    }
}
