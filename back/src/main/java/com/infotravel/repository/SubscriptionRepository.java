package com.infotravel.repository;

import com.infotravel.entity.SecuritySettings;
import com.infotravel.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription,Integer> {
    Optional<Subscription> findByUserUserId(int userId);
    void deleteByUser_UserId(Integer userId);
    boolean existsByUser_UserId(Integer userId);


}
