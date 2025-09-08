package com.vibesta.service;

import com.vibesta.model.User;
import com.vibesta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String email, String password, String role) {
        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
