package com.infotravel.controller;

import com.infotravel.entity.User;
import com.infotravel.exception.InvalidPasswordException;
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
    @PostMapping("/create")
    public ResponseEntity<Object> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.CREATED.value(),
                    "message", "User created successfully",
                    "data", createdUser
            ));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.BAD_REQUEST.value(),
                    "message", ex.getMessage()
            ));
        }
    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> loginRequest) {
        try {
            // Extract nickname and password from the request body
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            // Use the login method from UserService to authenticate the user
            User user = userService.login(email, password);

            // Return a successful response with the user data
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Login successful",
                    "data", user,
                    "token", "testtoken"
            ));
        } catch (UserNotFoundException | InvalidPasswordException ex) {
            // Handle failed login attempts with a 401 Unauthorized response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.UNAUTHORIZED.value(),
                    "message", ex.getMessage()
            ));
        }
    }



    // Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable int id) {

        try {
            User user = userService.getUserById(id)
                    .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "User retrieved successfully",
                    "data", user
            ));

        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
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
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "User updated successfully",
                    "data", updatedUser
            ));
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    // Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.OK.value(),
                            "message", "User with ID " + id + " has been deleted"
                    ));
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }
}

