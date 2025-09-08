package com.vibesta.controller;

import com.vibesta.model.Event;
import com.vibesta.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    // USER + ADMIN: View all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // USER + ADMIN: View single event by unique number
    @GetMapping("/{uniqueNumber}")
    public Event getEvent(@PathVariable String uniqueNumber) {
        return eventService.getEventByUniqueNumber(uniqueNumber);
    }

    // ADMIN: Add new event
    @PostMapping("/add")
    public Event addEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    // ADMIN: Update event
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }

    // ADMIN: Delete event
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return "Event deleted";
    }
    
}
