package com.vibesta.controller;

import com.vibesta.dto.AuthRequest;
import com.vibesta.dto.AuthResponse;
import com.vibesta.model.User;
import com.vibesta.service.JwtService;
import com.vibesta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        String role = (request.getRole() == null || request.getRole().isBlank())
                ? "USER"
                : request.getRole().toUpperCase();

        userService.registerUser(request.getEmail(), request.getPassword(), role);
        return role + " registered successfully!";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials");
        }

        User user = userService.findByEmail(request.getEmail());

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        claims.put("email", user.getEmail());

        String token = jwtService.generateToken(user.getEmail(), claims);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
