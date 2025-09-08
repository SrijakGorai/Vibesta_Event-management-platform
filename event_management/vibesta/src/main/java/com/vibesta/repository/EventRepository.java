package com.vibesta.repository;

import com.vibesta.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByEventUniqueNumber(String eventUniqueNumber);
}
