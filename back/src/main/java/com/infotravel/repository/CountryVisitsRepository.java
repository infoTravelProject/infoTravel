package com.infotravel.repository;

import com.infotravel.entity.Country;
import com.infotravel.entity.CountryVisits;
import com.infotravel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryVisitsRepository extends JpaRepository<CountryVisits,Integer> {
    List<CountryVisits> findByCountry_CountryId(Integer countryId);
    List<CountryVisits> findByUser_UserId(Integer userId);
}
