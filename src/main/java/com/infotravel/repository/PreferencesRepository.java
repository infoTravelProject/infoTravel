package com.infotravel.repository;

import com.infotravel.entity.Preferences;
import com.infotravel.entity.PrivacySettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PreferencesRepository extends JpaRepository<Preferences,Integer> {
    Optional<Preferences> findByUserUserId(int userId);
    void deleteByUser_UserId(Integer userId);
    boolean existsByUser_UserId(Integer userId);
}
