package com.infotravel.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "SecuritySettings")
public class SecuritySettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "security_id")
    private Integer securityId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "2FA setting is required")
    @Column(name = "enable_2fa")
    @JsonProperty("enable2fa")
    private Boolean enable2FA;

    @NotBlank(message = "security email required")
    @Email(message = "email must be valid")
    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "device_list",columnDefinition = "JSON")
    private String deviceList;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getEnable2FA() {
        return enable2FA;
    }

    public void setEnable2FA(Boolean enable2FA) {
        this.enable2FA = enable2FA;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDeviceList() {
        return deviceList;
    }

    public void setDeviceList(String deviceList) {
        this.deviceList = deviceList;
    }

    public Integer getSecurityId(){
        return securityId;
    }
}
