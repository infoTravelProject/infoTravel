package com.infotravel.service;

import com.infotravel.entity.Country;
import com.infotravel.entity.CountryContent;
import com.infotravel.exception.CountryContentNotFoundException;
import com.infotravel.exception.CountryNotFoundException;
import com.infotravel.repository.CountryContentRepository;
import com.infotravel.repository.CountryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CountryContentService {
    private final CountryContentRepository countryContentRepository;
    private final CountryRepository countryRepository;

    public CountryContentService(CountryContentRepository countryContentRepository,CountryRepository countryRepository ) {
        this.countryContentRepository = countryContentRepository;
        this.countryRepository = countryRepository;
    }

    public CountryContent getCountryContentByCountryId(int countryId){
        return countryContentRepository.findByCountryCountryId(countryId)
                .orElseThrow(()-> new CountryContentNotFoundException("Country content for country with id "+countryId+" not found"));
    }
    public CountryContent createCountryContent(int countryId, CountryContent countryContent){
        Country country = countryRepository.findById(countryId)
                .orElseThrow(()-> new CountryNotFoundException("Country with id "+countryId+" not found"));
        countryContent.setCountry(country);

        return countryContentRepository.save(countryContent);
    }

    public CountryContent updateCountryContent(int countryId, CountryContent updatedCountryContent){
        CountryContent existingCountryContent = countryContentRepository.findByCountryCountryId(countryId)
                .orElseThrow(()-> new CountryContentNotFoundException("Country content for country with id "+countryId+" not found"));

        if (updatedCountryContent.getCulturalInfo() == null || updatedCountryContent.getCulturalInfo().trim().isEmpty()) {
            existingCountryContent.setCulturalInfo("No cultural info provided");
        } else {
            existingCountryContent.setCulturalInfo(updatedCountryContent.getCulturalInfo());
        }

        if (updatedCountryContent.getSafetyInfo() == null || updatedCountryContent.getSafetyInfo().trim().isEmpty()) {
            existingCountryContent.setSafetyInfo("No safety info provided");
        } else {
            existingCountryContent.setSafetyInfo(updatedCountryContent.getSafetyInfo());
        }

        if (updatedCountryContent.getTravelAdvice() == null || updatedCountryContent.getTravelAdvice().trim().isEmpty()) {
            existingCountryContent.setTravelAdvice("No travel advice provided");
        } else {
            existingCountryContent.setTravelAdvice(updatedCountryContent.getTravelAdvice());
        }

        if (updatedCountryContent.getShortDescription() == null || updatedCountryContent.getShortDescription().trim().isEmpty()) {
            existingCountryContent.setShortDescription("No description available");
        } else {
            existingCountryContent.setShortDescription(updatedCountryContent.getShortDescription());
        }

        if (updatedCountryContent.getSources() == null || updatedCountryContent.getSources().trim().isEmpty()) {
            existingCountryContent.setSources("No sources provided");
        } else {
            existingCountryContent.setSources(updatedCountryContent.getSources());
        }

        return countryContentRepository.save(existingCountryContent);
    }

    @Transactional
    public void deleteCountryContent(int countryId){
        if(countryContentRepository.existsByCountry_CountryId(countryId)){
            countryContentRepository.deleteByCountry_CountryId(countryId);
        }else{
            throw new CountryContentNotFoundException("Country content for country with id "+countryId+" not found");
        }
    }
}
