package com.infotravel.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "PrivacySettings")
public class PrivacySettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "privacy_id")
    private Integer privacyId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Personalized ads choice is required")
    @Column(name = "personalized_ads")
    @JsonProperty("personalizedAds")
    private boolean personalizedAds;

    @NotNull(message = "Personalized news choice is required")
    @Column(name = "personalized_news")
    @JsonProperty("personalizedNews")
    private boolean personalizedNews;


    @NotNull(message = "Public profile choice is required")
    @Column(name = "public_profile")
    @JsonProperty("publicProfile")
    private boolean publicProfile;


    @NotNull(message = "Location tracking choice is required")
    @Column(name = "location_tracking")
    @JsonProperty("locationTracking")
    private boolean locationTracking;

    public Integer getPrivacyId() {
        return privacyId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isPersonalizedAds() {
        return personalizedAds;
    }

    public void setPersonalizedAds(boolean personalizedAds) {
        this.personalizedAds = personalizedAds;
    }

    public boolean isPersonalizedNews() {
        return personalizedNews;
    }

    public void setPersonalizedNews(boolean personalizedNews) {
        this.personalizedNews = personalizedNews;
    }

    public boolean isPublicProfile() {
        return publicProfile;
    }

    public void setPublicProfile(boolean publicProfile) {
        this.publicProfile = publicProfile;
    }

    public boolean isLocationTracking() {
        return locationTracking;
    }

    public void setLocationTracking(boolean locationTracking) {
        this.locationTracking = locationTracking;
    }
}
