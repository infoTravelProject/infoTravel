package com.infotravel.service;

import com.infotravel.entity.User;
import com.infotravel.exception.UserNotFoundException;
import com.infotravel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public User createUser(User user){
        return userRepository.save(user);
    }
    public void deleteUser(int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new UserNotFoundException("User with id " + userId + " not found");
        }
    }
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }

    public User updateUser(int userId, User user) {

        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            // Update only the fields that need to be updated, except for userId
            User updatedUser = existingUser.get();

            // Set the fields you want to update
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setNickname(user.getNickname());
            updatedUser.setDateOfBirth(user.getDateOfBirth());
            updatedUser.setRegion(user.getRegion());
            updatedUser.setProfileBio(user.getProfileBio());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPhoneNumber(user.getPhoneNumber());
            updatedUser.setPassword(user.getPassword());

            // Save the updated user (userId will not be manually set)
            return userRepository.save(updatedUser);
        }
        throw new UserNotFoundException("User with id " + userId + " not found");
    }
}
