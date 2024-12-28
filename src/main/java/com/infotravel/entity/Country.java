package com.infotravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "Country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    private Integer countryId;

    @NotBlank(message = "Name of the country is mandatory")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Code of the country is mandatory")
    @Column(name = "code")
    private String code;

    @Column(name = "flag_url")
    private String flagUrl;

    @Column(name = "region")
    private String region;

    @Column(name = "subregion")
    private String subregion;

    @Column(name = "population")
    private Long population;

    @Column(name = "area")
    private float area;

    @Column(name = "capital")
    private String capital;

    @Column(name = "currency")
    private String currency;

    @Column(name = "official_language")
    private String officialLanguage;

    public Integer getCountryId() {
        return countryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFlagUrl() {
        return flagUrl;
    }

    public void setFlagUrl(String flagUrl) {
        this.flagUrl = flagUrl;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSubregion() {
        return subregion;
    }

    public void setSubregion(String subregion) {
        this.subregion = subregion;
    }

    public Long getPopulation() {
        return population;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public float getArea() {
        return area;
    }

    public void setArea(float area) {
        this.area = area;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getOfficialLanguage() {
        return officialLanguage;
    }

    public void setOfficialLanguage(String officialLanguage) {
        this.officialLanguage = officialLanguage;
    }
}
