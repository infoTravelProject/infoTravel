package com.infotravel.service;

import com.infotravel.entity.Country;
import com.infotravel.entity.CountryVisits;
import com.infotravel.entity.User;
import com.infotravel.exception.CountryNotFoundException;
import com.infotravel.exception.CountryVisitsNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.CountryRepository;
import com.infotravel.repository.CountryVisitsRepository;
import com.infotravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryVisitsService {
        private final CountryVisitsRepository countryVisitsRepository;
        private final CountryRepository countryRepository;
        private final UserRepository userRepository;

    public CountryVisitsService(CountryVisitsRepository countryVisitsRepository, CountryRepository countryRepository, UserRepository userRepository) {
        this.countryVisitsRepository = countryVisitsRepository;
        this.countryRepository = countryRepository;
        this.userRepository = userRepository;
    }

    public CountryVisits createCountryVisit(int countryId, int userId, CountryVisits countryVisits) {
        // Fetch Country and User by their ids
        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new CountryNotFoundException("Country with id "+countryId+ " not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id "+userId+" not found"));


        countryVisits.setCountry(country);
        countryVisits.setUser(user);

        return countryVisitsRepository.save(countryVisits);
    }
    public List<CountryVisits> getAllCountryVisits(){
        List<CountryVisits> countryVisitsList = countryVisitsRepository.findAll();

        return Optional.of(countryVisitsList)
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new CountryVisitsNotFoundException("No country visits found"));


    }

    // Get all country visits for a specific country
    public List<CountryVisits> getCountryVisitsByCountry(int countryId) {
        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new CountryNotFoundException("Country with id "+countryId+ " not found"));
        return countryVisitsRepository.findByCountry_CountryId(countryId);
    }

    // Get all country visits for a specific user
    public List<CountryVisits> getCountryVisitsByUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id "+userId+" not found"));
        return countryVisitsRepository.findByUser_UserId(userId);
    }

    public CountryVisits updateCountryVisit(int visitId, CountryVisits updatedCountryVisit) {
        CountryVisits existingVisit = countryVisitsRepository.findById(visitId)
                .orElseThrow(() -> new CountryVisitsNotFoundException("Country visit not found for id "+visitId));

        // Update fields as necessary
        existingVisit.setVisitDate(updatedCountryVisit.getVisitDate());
        existingVisit.setRating(updatedCountryVisit.getRating());

        return countryVisitsRepository.save(existingVisit);
    }

    public CountryVisits getCountryVisitById(int visitId){
        return countryVisitsRepository.findById(visitId)
                .orElseThrow(() -> new CountryVisitsNotFoundException("Country visit not found for id "+visitId));

    }

    @Transactional
    public void deleteCountryVisit(int visitId){
        if (countryVisitsRepository.existsById(visitId)) {
            countryVisitsRepository.deleteById(visitId);
        } else {
            throw new CountryVisitsNotFoundException("Country visit not found for id "+visitId);
        }
    }
}
