package com.infotravel.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtils {
    // Create a BCryptPasswordEncoder instance
    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Method to hash a password
    public static String hashPassword(String password) {
        return passwordEncoder.encode(password);  // This returns a hashed password
    }

    // Method to check if a raw password matches the stored hash
    public static boolean checkPassword(String rawPassword, String storedHash) {
        return passwordEncoder.matches(rawPassword, storedHash);  // Compares the entered password with the stored hash
    }
}
