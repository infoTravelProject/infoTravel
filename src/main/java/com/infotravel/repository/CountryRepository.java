package com.infotravel.repository;

import com.infotravel.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country,Integer> {
}
