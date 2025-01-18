package com.infotravel.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Plan {

    Standard,

    Premium

//    public static Plan fromString(String plan) {
//        for (Plan p : Plan.values()) {
//            if (p.name().equalsIgnoreCase(plan)) { // Case-insensitive comparison
//                return p;
//            }
//        }
//        throw new IllegalArgumentException("Invalid plan value: " + plan);
//    }
}
