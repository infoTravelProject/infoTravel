package com.infotravel.repository;

import com.infotravel.entity.SecuritySettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SecuritySettingsRepository extends JpaRepository<SecuritySettings,Integer> {
    Optional<SecuritySettings> findByUserUserId(int userId);
    void deleteByUser_UserId(Integer userId);

    boolean existsByUser_UserId(Integer userId);
}
