package com.infotravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "CountryContent")
public class CountryContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Integer contentId;

    @OneToOne
    @JoinColumn(name = "country_id",nullable = false)
    private Country country;

    @NotBlank(message = "Safety info required")
    @Column(name = "safety_info")
    private String safetyInfo;


    @Column(name = "cultural_info")
    private String culturalInfo = "No cultural info provided";

    @Column(name = "travel_advice")
    private String travelAdvice = "No travel advice provided";

    @Column(name = "short_description")
    private String shortDescription = "No description available";

    @Column(name = "sources")
    private String sources = "No sources provided";

    public Integer getContentId() {
        return contentId;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public String getSafetyInfo() {
        return safetyInfo;
    }

    public void setSafetyInfo(String safetyInfo) {
        this.safetyInfo = safetyInfo;
    }

    public String getCulturalInfo() {
        return culturalInfo;
    }

    public void setCulturalInfo(String culturalInfo) {
        this.culturalInfo = culturalInfo;
    }

    public String getTravelAdvice() {
        return travelAdvice;
    }

    public void setTravelAdvice(String travelAdvice) {
        this.travelAdvice = travelAdvice;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getSources() {
        return sources;
    }

    public void setSources(String sources) {
        this.sources = sources;
    }
}
