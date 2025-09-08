package com.vibesta.controller;

import com.vibesta.model.Event;
import com.vibesta.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/events")
public class AdminEventController {

    @Autowired
    private EventService eventService;

    // ADMIN: Add new event
    @PostMapping("/add")
    public Event addEvent(@RequestBody Event event) {
        // Ensure remainingTickets is initialized to totalTickets
        event.setRemainingTickets(event.getTotalTickets());
        return eventService.createEvent(event);
    }


    // ADMIN: Update event by ID
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Event existingEvent = eventService.getEventById(id);

        // Update only allowed fields
        existingEvent.setEventName(updatedEvent.getEventName());
        existingEvent.setEventDetails(updatedEvent.getEventDetails());
        existingEvent.setEventDate(updatedEvent.getEventDate());
        existingEvent.setTotalTickets(updatedEvent.getTotalTickets());
        existingEvent.setRemainingTickets(updatedEvent.getRemainingTickets());
        existingEvent.setMaxTicketsPerUser(updatedEvent.getMaxTicketsPerUser());

        return eventService.updateEvent(id, existingEvent);
    }

    // ADMIN: Delete event by ID
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return "Event deleted successfully";
    }

    // ADMIN: List all events (optional)
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
    
}
