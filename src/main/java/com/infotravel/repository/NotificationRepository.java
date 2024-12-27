package com.infotravel.repository;

import com.infotravel.entity.Notification;
import com.infotravel.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    Optional<Notification> findByUserUserId(int userId);
    void deleteByUser_UserId(Integer userId);
    boolean existsByUser_UserId(Integer userId);
}
