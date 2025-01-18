package com.infotravel.exception;

public class PreferencesNotFoundException extends RuntimeException{
    public PreferencesNotFoundException(String message){
        super(message);
    }
}
