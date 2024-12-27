package com.infotravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Integer notificationId;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @NotNull
    @Column(name = "login_alerts")
    private boolean loginAlerts;

    @NotNull
    @Column(name = "new_features")
    private boolean newFeatures;

    @NotNull
    @Column(name = "recommended_events")
    private boolean recommendedEvents;

    @NotNull
    @Column(name = "special_offers")
    private boolean specialOffers;

    @NotNull
    @Column(name = "upcoming_trips")
    private boolean upcomingTrips;

    @NotNull
    @Column(name = "personalized_news")
    private boolean personalizedNews;

    public Integer getNotificationId() {
        return notificationId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isLoginAlerts() {
        return loginAlerts;
    }

    public void setLoginAlerts(boolean loginAlerts) {
        this.loginAlerts = loginAlerts;
    }

    public boolean isNewFeatures() {
        return newFeatures;
    }

    public void setNewFeatures(boolean newFeatures) {
        this.newFeatures = newFeatures;
    }

    public boolean isRecommendedEvents() {
        return recommendedEvents;
    }

    public void setRecommendedEvents(boolean recommendedEvents) {
        this.recommendedEvents = recommendedEvents;
    }

    public boolean isSpecialOffers() {
        return specialOffers;
    }

    public void setSpecialOffers(boolean specialOffers) {
        this.specialOffers = specialOffers;
    }

    public boolean isUpcomingTrips() {
        return upcomingTrips;
    }

    public void setUpcomingTrips(boolean upcomingTrips) {
        this.upcomingTrips = upcomingTrips;
    }

    public boolean isPersonalizedNews() {
        return personalizedNews;
    }

    public void setPersonalizedNews(boolean personalizedNews) {
        this.personalizedNews = personalizedNews;
    }
}
