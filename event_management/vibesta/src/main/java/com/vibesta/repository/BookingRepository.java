package com.vibesta.repository;

import com.vibesta.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserEmail(String userEmail);
    Optional<Booking> findByUserEmailAndEventEventUniqueNumber(String userEmail, String eventUniqueNumber);
}