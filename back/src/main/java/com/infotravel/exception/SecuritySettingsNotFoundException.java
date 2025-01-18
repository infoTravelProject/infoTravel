package com.infotravel.exception;

public class SecuritySettingsNotFoundException extends RuntimeException{
    public SecuritySettingsNotFoundException(String message) {
        super(message);
    }
}
