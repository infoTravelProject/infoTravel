package com.infotravel.repository;

import com.infotravel.entity.CountryContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CountryContentRepository extends JpaRepository<CountryContent,Integer> {
    Optional<CountryContent> findByCountryCountryId(int countryId);
    void deleteByCountry_CountryId(Integer countryId);
    boolean existsByCountry_CountryId(Integer countryId);
}
