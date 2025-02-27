package com.infotravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name = "Devices")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private Integer deviceId;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @NotBlank(message = "Device name is mandatory")
    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "last_active")
    private Date lastActive;

    public Integer getDeviceId() {
        return deviceId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public Date getLastActive() {
        return lastActive;
    }

    public void setLastActive(Date lastActive) {
        this.lastActive = lastActive;
    }
}
