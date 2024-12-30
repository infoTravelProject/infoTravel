package com.infotravel.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.infotravel.entity.Country;
import com.infotravel.exception.CountryNotFoundException;
import com.infotravel.repository.CountryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Optional;

@Service
public class CountryService {
    private final CountryRepository countryRepository;
    private final ObjectMapper objectMapper;

    @Value("${api.ninja.key}")
    private String apiKey;


    public CountryService(CountryRepository countryRepository, ObjectMapper objectMapper) {
        this.countryRepository = countryRepository;
        this.objectMapper = objectMapper;
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


public Country fetchAndSaveCountryFromApi(String countryName) {
    try {
        // API URL for Primary API
        String primaryApiUrl = "https://api.api-ninjas.com/v1/country?name=" + countryName;

        // Set up HTTP connection for Primary API
        URL primaryUrl = new URL(primaryApiUrl);
        HttpURLConnection primaryConnection = (HttpURLConnection) primaryUrl.openConnection();
        primaryConnection.setRequestProperty("accept", "application/json");
        primaryConnection.setRequestProperty("X-Api-Key", apiKey);

        // Read response from Primary API
        InputStream primaryResponseStream = primaryConnection.getInputStream();
        CountryApiResponse[] primaryApiResponse = objectMapper.readValue(primaryResponseStream, CountryApiResponse[].class);

        if (primaryApiResponse.length > 0) {
            CountryApiResponse primaryData = primaryApiResponse[0];
            Country country = new Country();

            // Fill fields from Primary API
            country.setName(primaryData.getName());
            country.setRegion(primaryData.getRegion());
            country.setSubregion(primaryData.getSubregion());
            country.setCapital(primaryData.getCapital());
            country.setCode(primaryData.getIso2());
            country.setCurrency(primaryData.getCurrency() != null ? primaryData.getCurrency().getCode() : null);
            country.setPopulation(primaryData.getPopulation());
            country.setArea(primaryData.getSurface_area() != null ? primaryData.getSurface_area() : 0.0f);

            // Secondary API URL
            String secondaryApiUrl = "https://restcountries.com/v3.1/name/" + countryName;

            // Set up HTTP connection for Secondary API
            URL secondaryUrl = new URL(secondaryApiUrl);
            HttpURLConnection secondaryConnection = (HttpURLConnection) secondaryUrl.openConnection();
            secondaryConnection.setRequestProperty("accept", "application/json");

            // Read response from Secondary API
            InputStream secondaryResponseStream = secondaryConnection.getInputStream();
            JsonNode secondaryApiResponse = objectMapper.readTree(secondaryResponseStream).get(0);

            // Fill additional fields from Secondary API
            country.setFlagUrl(secondaryApiResponse.path("flags").path("png").asText());
            country.setSubregion(secondaryApiResponse.path("subregion").asText());
            if (secondaryApiResponse.path("languages").elements().hasNext()) {
                country.setOfficialLanguage(secondaryApiResponse.path("languages").elements().next().asText());
            }

            // Save to database
            return countryRepository.save(country);
        } else {
            throw new RuntimeException("No data found for country: " + countryName);
        }
    } catch (Exception e) {
        throw new RuntimeException("Error fetching data: " + e.getMessage(), e);
    }
}

    // DTO for API response
    private static class CountryApiResponse {
        private String name;
        private String region;
        private String capital;
        private String iso2;
        private String subregion;
        private Long population;
        private Float surface_area;
        private Currency currency;

        public static class Currency {
            private String code;
            private String name;

            public String getCode() {
                return code;
            }

            public void setCode(String code) {
                this.code = code;
            }

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getRegion() {
            return region;
        }

        public void setRegion(String region) {
            this.region = region;
        }

        public String getCapital() {
            return capital;
        }

        public void setCapital(String capital) {
            this.capital = capital;
        }

        public String getIso2() {
            return iso2;
        }

        public void setIso2(String iso2) {
            this.iso2 = iso2;
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

        public Float getSurface_area() {
            return surface_area;
        }

        public void setSurface_area(Float surface_area) {
            this.surface_area = surface_area;
        }

        public Currency getCurrency() {
            return currency;
        }

        public void setCurrency(Currency currency) {
            this.currency = currency;
        }
    }
}
