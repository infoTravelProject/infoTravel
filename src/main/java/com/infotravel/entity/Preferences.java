package com.infotravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Preferences")
public class Preferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preference_id")
    private Integer preferenceId;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "theme")
    private Theme theme;

    @NotNull
    @Column(name = "language")
    private String language;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "units")
    private Units units;

    @NotNull
    @Column(name = "currency")
    private String currency;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "profile_theme")
    private ProfileTheme profileTheme;

    @NotNull
    @Column(name = "display_following_count")
    private boolean displayFollowingCount;

    @NotNull
    @Column(name = "display_nickname_instead_name")
    private boolean displayNicknameInsteadName;

    @NotNull
    @Column(name = "display_age")
    private boolean displayAge;

    @NotNull
    @Column(name = "display_region")
    private boolean displayRegion;

    @NotNull
    @Column(name = "display_visited_countries")
    private boolean displayVisitedCountries;

    public Integer getPreferenceId() {
        return preferenceId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Units getUnits() {
        return units;
    }

    public void setUnits(Units units) {
        this.units = units;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public ProfileTheme getProfileTheme() {
        return profileTheme;
    }

    public void setProfileTheme(ProfileTheme profileTheme) {
        this.profileTheme = profileTheme;
    }

    public boolean isDisplayFollowingCount() {
        return displayFollowingCount;
    }

    public void setDisplayFollowingCount(boolean displayFollowingCount) {
        this.displayFollowingCount = displayFollowingCount;
    }

    public boolean isDisplayNicknameInsteadName() {
        return displayNicknameInsteadName;
    }

    public void setDisplayNicknameInsteadName(boolean displayNicknameInsteadName) {
        this.displayNicknameInsteadName = displayNicknameInsteadName;
    }

    public boolean isDisplayAge() {
        return displayAge;
    }

    public void setDisplayAge(boolean displayAge) {
        this.displayAge = displayAge;
    }

    public boolean isDisplayRegion() {
        return displayRegion;
    }

    public void setDisplayRegion(boolean displayRegion) {
        this.displayRegion = displayRegion;
    }

    public boolean isDisplayVisitedCountries() {
        return displayVisitedCountries;
    }

    public void setDisplayVisitedCountries(boolean displayVisitedCountries) {
        this.displayVisitedCountries = displayVisitedCountries;
    }
}
