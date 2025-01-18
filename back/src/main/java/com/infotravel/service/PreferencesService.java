package com.infotravel.service;

import com.infotravel.entity.Preferences;
import com.infotravel.entity.User;
import com.infotravel.exception.NotificationNotFoundException;
import com.infotravel.exception.PreferencesNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.PreferencesRepository;
import com.infotravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PreferencesService {
    private final PreferencesRepository preferencesRepository;
    private final UserRepository userRepository;

    public PreferencesService(PreferencesRepository preferencesRepository, UserRepository userRepository) {
        this.preferencesRepository = preferencesRepository;
        this.userRepository = userRepository;
    }
    public Preferences getPreferencesByUserId(int userId){
        return preferencesRepository.findByUserUserId(userId)
                .orElseThrow(()-> new PreferencesNotFoundException("Preferences settings for user with id " + userId + " not found"));
    }

    public Preferences createPreferences(int userId, Preferences preferences){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User with id " + userId + " not found"));
        preferences.setUser(user);

        return preferencesRepository.save(preferences);
    }

    public Preferences updatePreferences(int userId, Preferences updatedPreferences){
        Preferences existingPreferences = preferencesRepository.findByUserUserId(userId)
                .orElseThrow(()-> new PreferencesNotFoundException("Preferences for user with id " + userId + " not found"));
        existingPreferences.setCurrency(updatedPreferences.getCurrency());
        existingPreferences.setDisplayAge(updatedPreferences.isDisplayAge());
        existingPreferences.setDisplayFollowingCount(updatedPreferences.isDisplayFollowingCount());
        existingPreferences.setLanguage(updatedPreferences.getLanguage());
        existingPreferences.setDisplayRegion(updatedPreferences.isDisplayRegion());
        existingPreferences.setTheme(updatedPreferences.getTheme());
        existingPreferences.setUnits(updatedPreferences.getUnits());
        existingPreferences.setDisplayVisitedCountries(existingPreferences.isDisplayVisitedCountries());
        existingPreferences.setProfileTheme(updatedPreferences.getProfileTheme());
        existingPreferences.setDisplayNicknameInsteadName(updatedPreferences.isDisplayNicknameInsteadName());
        return preferencesRepository.save(existingPreferences);
    }

    @Transactional
    public void deletePreferences(int userId){
        if(preferencesRepository.existsByUser_UserId(userId)){
            preferencesRepository.deleteByUser_UserId(userId);
        }else{
            throw new PreferencesNotFoundException("Preferences for user with id " + userId + " not found");
        }
    }
}
