package com.infotravel.controller;

import com.infotravel.entity.CountryContent;
import com.infotravel.entity.Notification;
import com.infotravel.exception.CountryContentNotFoundException;
import com.infotravel.exception.CountryNotFoundException;
import com.infotravel.exception.NotificationNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.CountryContentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/country-content")
@Validated
public class CountryContentController {

    private final CountryContentService contentService;

    public CountryContentController(CountryContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/{countryId}")
    public ResponseEntity<Object> getCountryContent(@PathVariable int countryId){
        try{
            CountryContent countryContent = contentService.getCountryContentByCountryId(countryId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country content retrieved successfully",
                    "data", countryContent
            ));
        }catch (CountryContentNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @PostMapping("/{countryId}")
    public ResponseEntity<Object> createCountryContent(
            @PathVariable int countryId,
            @RequestBody @Valid CountryContent countryContent
    ){
        try {
            CountryContent createdContent = contentService.createCountryContent(countryId, countryContent);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country content created successfully",
                    "data", createdContent
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

    @PutMapping("/{countryId}")
    public ResponseEntity<Object> updateCountryContent(
            @PathVariable int countryId,
            @RequestBody @Valid CountryContent countryContent
    ){
        try{
            CountryContent updated = contentService.updateCountryContent(countryId, countryContent);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Country content updated successfully",
                    "data", updated
            ));
        }catch (CountryContentNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{countryId}")
    public ResponseEntity<Object> deleteCountryContent(@PathVariable int countryId){
        try{
            contentService.deleteCountryContent(countryId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.OK.value(),
                            "message", "Country content for user with ID " + countryId + " has been deleted"
                    ));
        }catch (CountryContentNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
}
