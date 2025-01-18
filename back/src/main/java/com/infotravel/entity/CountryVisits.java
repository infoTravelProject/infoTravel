package com.infotravel.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "CountryVisits")
public class CountryVisits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visit_id")
    private Integer visitId;

    @ManyToOne()
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne()
    @JoinColumn(name = "country_id",nullable = false)
    private Country country;

    @Column(name = "visit_date")
    private LocalDate visitDate;

    @Column(name = "rating")
    private int rating;

    public Integer getVisitId() {
        return visitId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
