package com.infotravel.service;

import com.infotravel.entity.Plan;
import com.infotravel.entity.Subscription;
import com.infotravel.entity.User;
import com.infotravel.exception.SubscriptionNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.SubscriptionRepository;
import com.infotravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }
    public Subscription getSubscriptionByUserId(int userId){
        return subscriptionRepository.findByUserUserId(userId)
                .orElseThrow(()-> new SubscriptionNotFoundException("Subscription for user with id " + userId + " not found"));
    }

    public Subscription createSubscription(int userId, Subscription subscription){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User with id " + userId + " not found"));
        subscription.setUser(user);

        return subscriptionRepository.save(subscription);
    }
    public Subscription updateSubscription(int userId, Subscription updatedSubscription){
        Subscription existingSubscription = subscriptionRepository.findByUserUserId(userId)
                .orElseThrow(()-> new SubscriptionNotFoundException("Subscription for user with id " + userId + " not found"));
        //Plan validatedPlan = Plan.fromString(updatedSubscription.getPlan().name());
        existingSubscription.setPrice(updatedSubscription.getPrice());
        existingSubscription.setPlan(updatedSubscription.getPlan());
        existingSubscription.setStartDate(updatedSubscription.getStartDate());
        existingSubscription.setEndDate(updatedSubscription.getEndDate());

        return subscriptionRepository.save(existingSubscription);
    }

    @Transactional
    public void deleteSubscription(int userId){
        if(subscriptionRepository.existsByUser_UserId(userId)){
            subscriptionRepository.deleteByUser_UserId(userId);
        }else{
            throw new SubscriptionNotFoundException("Subscription for user with id " + userId + " not found");
        }
    }
}
