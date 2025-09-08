package com.vibesta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity  // Enables @PreAuthorize and other method-level security annotations
public class VibestaApplication {
    public static void main(String[] args) {
        SpringApplication.run(VibestaApplication.class, args);
    }
}
