package com.infotravel.repository;

import com.infotravel.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device,Integer> {
    Optional<List<Device>> findByUserUserId(int userId);
    void deleteByUser_UserId(Integer userId);
    boolean existsByUser_UserId(Integer userId);
    Integer countByUser_UserId(Integer userId);
}
