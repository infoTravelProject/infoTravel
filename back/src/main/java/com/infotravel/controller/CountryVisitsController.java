package com.infotravel.controller;

import com.infotravel.entity.CountryVisits;
import com.infotravel.exception.CountryNotFoundException;
import com.infotravel.exception.CountryVisitsNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.CountryVisitsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/country-visits")
public class CountryVisitsController {
    private final CountryVisitsService countryVisitsService;

    public CountryVisitsController(CountryVisitsService countryVisitsService) {
        this.countryVisitsService = countryVisitsService;
    }

    @GetMapping("/{visitId}")
    public ResponseEntity<Object> getCountryVisitById(@PathVariable int visitId) {
        try {
            CountryVisits countryVisit = countryVisitsService.getCountryVisitById(visitId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country visit retrieved successfully",
                    "data", countryVisit
            ));
        } catch (CountryVisitsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "message", "An unexpected error occurred",
                            "error", ex.getMessage()
                    ));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getCountryVisitByUserId(@PathVariable int userId) {
        try {
            List<CountryVisits> countryVisit = countryVisitsService.getCountryVisitsByUser(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country visit retrieved successfully",
                    "data", countryVisit
            ));
        } catch (CountryVisitsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "message", "An unexpected error occurred",
                            "error", ex.getMessage()
                    ));
        }
    }

    @GetMapping("/country/{countryId}")
    public ResponseEntity<Object> getCountryVisitByCountryId(@PathVariable int countryId) {
        try {
            List<CountryVisits> countryVisit = countryVisitsService.getCountryVisitsByCountry(countryId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country visit retrieved successfully",
                    "data", countryVisit
            ));
        } catch (CountryVisitsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "message", "An unexpected error occurred",
                            "error", ex.getMessage()
                    ));
        }
    }


    @PostMapping
    public ResponseEntity<Object> createCountryVisit(
            @RequestParam int countryId,
            @RequestParam int userId,
            @RequestBody CountryVisits countryVisits
            ){
        try {
            CountryVisits createdVisit = countryVisitsService.createCountryVisit(countryId, userId, countryVisits);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country visit created successfully",
                    "data", createdVisit
            ));
        } catch (CountryNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "message", "An unexpected error occurred",
                            "error", ex.getMessage()
                    ));
        }
    }

    @PutMapping("/{visitId}")
    public ResponseEntity<Object> updateCountryVisit(
            @PathVariable int visitId,
            @RequestBody CountryVisits updatedCountryVisit) {

        try {
            CountryVisits updatedVisit = countryVisitsService.updateCountryVisit(visitId, updatedCountryVisit);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country visit updated successfully",
                    "data", updatedVisit
            ));
        } catch (CountryVisitsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "message", "An unexpected error occurred",
                            "error", ex.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{visitId}")
    public ResponseEntity<Object> deleteCountryVisit(@PathVariable int visitId) {
        try {
            countryVisitsService.deleteCountryVisit(visitId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country visit deleted successfully"
            ));
        } catch (CountryVisitsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "message", "An unexpected error occurred",
                            "error", ex.getMessage()
                    ));
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAllCountryVisits() {
        try {
            List<CountryVisits> countryVisits = countryVisitsService.getAllCountryVisits();
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country visits retrieved successfully",
                    "data", countryVisits
            ));
        } catch (CountryVisitsNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()

                    ));
        }
    }

}
