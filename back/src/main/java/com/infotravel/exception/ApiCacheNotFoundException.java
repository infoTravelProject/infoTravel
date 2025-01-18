package com.infotravel.exception;

public class ApiCacheNotFoundException extends RuntimeException{
    public ApiCacheNotFoundException(String message){
        super(message);
    }
}
