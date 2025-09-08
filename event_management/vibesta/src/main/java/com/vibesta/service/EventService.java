package com.vibesta.service;

import com.vibesta.model.Event;
import com.vibesta.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event) {
        event.setRemainingTickets(event.getTotalTickets());
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventByUniqueNumber(String uniqueNumber) {
        return eventRepository.findByEventUniqueNumber(uniqueNumber)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }
 // EventService.java
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }


    public Event updateEvent(Long id, Event updatedEvent) {
        Event existingEvent = getEventById(id); // ✅ now works

        existingEvent.setEventName(updatedEvent.getEventName());
        existingEvent.setEventDetails(updatedEvent.getEventDetails());
        existingEvent.setEventDate(updatedEvent.getEventDate());
     // ✅ Adjust total and remaining tickets safely
        int bookedTickets = existingEvent.getTotalTickets() - existingEvent.getRemainingTickets();
        existingEvent.setTotalTickets(updatedEvent.getTotalTickets());
        existingEvent.setRemainingTickets(updatedEvent.getTotalTickets() - bookedTickets);

        existingEvent.setMaxTicketsPerUser(updatedEvent.getMaxTicketsPerUser());

        return eventRepository.save(existingEvent);
    }


    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
