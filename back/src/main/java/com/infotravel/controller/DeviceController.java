package com.infotravel.controller;

import com.infotravel.entity.Device;
import com.infotravel.exception.DeviceNotFoundException;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.service.DeviceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/device")
@Validated
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/{deviceId}")
    public ResponseEntity<Object> getDeviceById(@PathVariable int deviceId){
        try{
            Device device = deviceService.getDeviceById(deviceId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Subscription retrieved successfully",
                    "data", device
            ));
        }catch(DeviceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getDevicesByUser(@PathVariable int userId) {
        try{
            List<Device> devices = deviceService.getDevicesByUserId(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Devices retrieved successfully",
                    "data", devices
            ));
        }catch (DeviceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }

    }
    @PostMapping("/user/{userId}")
    public ResponseEntity<Object> createDevice(
            @PathVariable int userId,
            @RequestBody @Valid Device device
    ){
        try{
            Device createdDevice = deviceService.createDevice(userId,device);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Device created successfully",
                    "data", createdDevice
            ));
        }catch (UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }
    }

    @PutMapping("/{deviceId}")
    public ResponseEntity<Object> updateDevice(
            @PathVariable int deviceId,
            @RequestBody @Valid Device updatedDevice) {
        try{
            Device device = deviceService.updateDevice(deviceId,updatedDevice);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Device updated successfully",
                    "data", device
            ));
        }catch (DeviceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }

    }

    @DeleteMapping("/{deviceId}")
    public ResponseEntity<Object> deleteDevice(@PathVariable int deviceId) {
        try{
            deviceService.deleteDevice(deviceId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "Device deleted successfully"
            ));
        }catch(DeviceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }

    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Object> deleteAllDevicesByUserId(@PathVariable int userId) {
        try{
            deviceService.deleteAllDevicesByUserId(userId);
            return ResponseEntity.ok(Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "status", HttpStatus.OK.value(),
                    "message", "All devices for user deleted successfully"
            ));
        }catch (DeviceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "timestamp", System.currentTimeMillis(),
                            "status", HttpStatus.NOT_FOUND.value(),
                            "message", ex.getMessage()
                    ));
        }

    }
}
