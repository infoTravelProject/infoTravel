package com.infotravel.controller;

import com.infotravel.entity.Country;
import com.infotravel.exception.CountryNotFoundException;
import com.infotravel.service.CountryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/country")
@Validated
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCountryById(@PathVariable int id){
        try{
            Country country = countryService.getCountryById(id)
                    .orElseThrow(()-> new CountryNotFoundException("Country with ID "+id+" not found"));
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country retrieved successfully",
                    "data", country
            ));
        }catch (CountryNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @PostMapping
    public ResponseEntity<Object> createCountry(@Valid @RequestBody Country country){
        Country createdCountry = countryService.createCountry(country);
        return ResponseEntity.ok(Map.of(
                "timestamp", System.currentTimeMillis(),
                "status", HttpStatus.CREATED.value(),
                "message", "Country created successfully",
                "data", createdCountry
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCountry(@PathVariable int id,
                                                @RequestBody @Valid Country country){
        try{
            Country updatedCountry = countryService.updateCountry(id,country);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country updated successfully",
                    "data", updatedCountry
            ));
        }catch (CountryNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCountry(@PathVariable int id){
        try{
            countryService.deleteCountry(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.OK.value(),
                            "message", "Country with ID " + id + " has been deleted"
                    ));
        }catch (CountryNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
    @PostMapping("/fetch-from-api")
    public ResponseEntity<Object> fetchAndSaveCountry(@RequestParam String name) {
        try {
            Country country = countryService.fetchAndSaveCountryFromApi(name);
            return ResponseEntity.ok(country);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
