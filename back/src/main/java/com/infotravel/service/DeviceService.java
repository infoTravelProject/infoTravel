package com.infotravel.service;

import com.infotravel.entity.Device;
import com.infotravel.entity.User;
import com.infotravel.exception.DeviceNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.DeviceRepository;
import com.infotravel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;

    public DeviceService(DeviceRepository deviceRepository, UserRepository userRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
    }

    public List<Device> getDevicesByUserId(int userId){
        return deviceRepository.findByUserUserId(userId)
                .filter(devices -> !devices.isEmpty())
                .orElseThrow(()->new DeviceNotFoundException("No devices found for user with id "+userId));
    }

    public Device getDeviceById(int deviceId){
        return deviceRepository.findById(deviceId)
                .orElseThrow(()-> new DeviceNotFoundException("No device found with id "+deviceId));

    }

    public Device createDevice(int userId, Device device){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User with id " + userId + " not found"));
        device.setUser(user);

        return deviceRepository.save(device);
    }
    public Device updateDevice(Integer deviceId,Device updatedDevice){
        Device existingDevice = getDeviceById(deviceId);
        existingDevice.setDeviceName(updatedDevice.getDeviceName());
        return deviceRepository.save(existingDevice);
    }

    @Transactional
    public void deleteDevice(int deviceId){
        if(deviceRepository.existsById(deviceId)){
            deviceRepository.deleteById(deviceId);
        }else{
            throw new DeviceNotFoundException("No device with specified id "+deviceId);
        }
    }
    @Transactional
    public void deleteAllDevicesByUserId(int userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("No user found with id " + userId);
        }
        deviceRepository.findByUserUserId(userId)
                .filter(devices -> !devices.isEmpty())
                .orElseThrow(()->new DeviceNotFoundException("No devices found for user with id "+userId));

        deviceRepository.deleteByUser_UserId(userId);
    }
}
