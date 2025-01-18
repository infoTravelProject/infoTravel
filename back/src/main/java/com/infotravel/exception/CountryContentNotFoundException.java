package com.infotravel.exception;

public class CountryContentNotFoundException extends RuntimeException{
    public CountryContentNotFoundException(String message){
        super(message);
    }
}
