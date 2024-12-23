package com.infotravel.controller;

import com.infotravel.entity.User;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    // Create User
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {

        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "User created successfully",
                "user", createdUser
        ));
    }

    // Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable int id) {

        try {
            User user = userService.getUserById(id)
                    .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));
            return ResponseEntity.ok(user);

        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", ex.getMessage(),
                    "timestamp", System.currentTimeMillis()
            ));
        }
    }

    // Update User
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable int id,
                                             @RequestBody @Valid User user) {

        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(Map.of(
                    "message", "User updated successfully",
                    "user", updatedUser
            ));
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", ex.getMessage(),
                    "timestamp", System.currentTimeMillis()
            ));
        }
    }

    // Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of(
                    "message", "User deleted successfully",
                    "timestamp", System.currentTimeMillis()
            ));
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", ex.getMessage(),
                    "timestamp", System.currentTimeMillis()
            ));
        }
    }
}

