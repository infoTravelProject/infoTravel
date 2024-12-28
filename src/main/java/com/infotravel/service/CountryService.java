package com.infotravel.service;

import com.infotravel.entity.Country;
import com.infotravel.exception.CountryNotFoundException;
import com.infotravel.repository.CountryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> getAllCountries(){return countryRepository.findAll();}
    public Country createCountry(Country country){return countryRepository.save(country);}

    public Optional<Country> getCountryById(int countryId){
        return countryRepository.findById(countryId);
    }
    public Country updateCountry(int countryId, Country country){
        Optional<Country> existingCountry = countryRepository.findById(countryId);

        if(existingCountry.isPresent()){
            Country updatedCountry = existingCountry.get();

            updatedCountry.setName(country.getName());
            updatedCountry.setCapital(country.getCapital());
            updatedCountry.setArea(country.getArea());
            updatedCountry.setCode(country.getCode());
            updatedCountry.setCurrency(country.getCurrency());
            updatedCountry.setFlagUrl(country.getFlagUrl());
            updatedCountry.setPopulation(country.getPopulation());
            updatedCountry.setSubregion(country.getSubregion());
            updatedCountry.setRegion(country.getRegion());
            updatedCountry.setOfficialLanguage(country.getOfficialLanguage());

            return countryRepository.save(updatedCountry);
        }
        throw new CountryNotFoundException("Country with id "+countryId+" not found");
    }

    @Transactional
    public void deleteCountry(int countryId){
        if(countryRepository.existsById(countryId)){
            countryRepository.deleteById(countryId);
        }else{
            throw new CountryNotFoundException("Country with id "+ countryId+" not found");
        }
    }
}
