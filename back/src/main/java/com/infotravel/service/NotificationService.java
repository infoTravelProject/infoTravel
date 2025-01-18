package com.infotravel.service;

import com.infotravel.entity.Notification;
import com.infotravel.entity.Subscription;
import com.infotravel.entity.User;
import com.infotravel.exception.NotificationNotFoundException;
import com.infotravel.exception.SubscriptionNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.NotificationRepository;
import com.infotravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    public Notification getNotificationByUserId(int userId){
        return notificationRepository.findByUserUserId(userId)
                .orElseThrow(()-> new NotificationNotFoundException("Notification settings for user with id " + userId + " not found"));
    }
    public Notification createNotification(int userId, Notification notification){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User with id " + userId + " not found"));
        notification.setUser(user);

        return notificationRepository.save(notification);
    }
    public Notification updateNotification(int userId, Notification updatedNotification){
        Notification existingNotification = notificationRepository.findByUserUserId(userId)
                .orElseThrow(()-> new NotificationNotFoundException("Notification for user with id " + userId + " not found"));

        existingNotification.setLoginAlerts(updatedNotification.isLoginAlerts());
        existingNotification.setNewFeatures(updatedNotification.isNewFeatures());
        existingNotification.setPersonalizedNews(updatedNotification.isPersonalizedNews());
        existingNotification.setRecommendedEvents(updatedNotification.isRecommendedEvents());
        existingNotification.setSpecialOffers(updatedNotification.isSpecialOffers());
        existingNotification.setUpcomingTrips(updatedNotification.isUpcomingTrips());


        return notificationRepository.save(existingNotification);
    }

    @Transactional
    public void deleteNotification(int userId){
        if(notificationRepository.existsByUser_UserId(userId)){
            notificationRepository.deleteByUser_UserId(userId);
        }else{
           throw new NotificationNotFoundException("Notification for user with id " + userId + " not found");
        }
    }
}
