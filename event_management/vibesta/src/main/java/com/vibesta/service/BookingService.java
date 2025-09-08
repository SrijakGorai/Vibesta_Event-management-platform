package com.vibesta.service;

import com.vibesta.model.Booking;
import com.vibesta.model.Event;
import com.vibesta.repository.BookingRepository;
import com.vibesta.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    /*public Booking bookTickets(String userEmail, String eventUniqueNumber, int ticketCount) {
        Event event = eventRepository.findByEventUniqueNumber(eventUniqueNumber)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getRemainingTickets() < ticketCount) {
            throw new RuntimeException("Not enough tickets available");
        }

        event.setRemainingTickets(event.getRemainingTickets() - ticketCount);
        eventRepository.save(event);

        Booking booking = Booking.builder()
                .userEmail(userEmail)
                .event(event)
                .ticketsBooked(ticketCount)
                .build();

        return bookingRepository.save(booking);*/
    public Booking bookTickets(String userEmail, String eventUniqueNumber, int ticketCount) {
        // Check if the user has already booked this event
        Optional<Booking> existingBooking = bookingRepository
            .findByUserEmailAndEventEventUniqueNumber(userEmail, eventUniqueNumber);

        if (existingBooking.isPresent()) {
            throw new RuntimeException("You have already booked this event");
        }

        // Proceed with booking if not already booked
        Event event = eventRepository.findByEventUniqueNumber(eventUniqueNumber)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getRemainingTickets() < ticketCount) {
            throw new RuntimeException("Not enough tickets available");
        }

        event.setRemainingTickets(event.getRemainingTickets() - ticketCount);
        eventRepository.save(event);

        Booking booking = Booking.builder()
                .userEmail(userEmail)
                .event(event)
                .ticketsBooked(ticketCount)
                .build();

        return bookingRepository.save(booking);
    }


    public List<Booking> getBookingsByUser(String userEmail) {
        return bookingRepository.findByUserEmail(userEmail);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    public void cancelBooking(String userEmail, String eventUniqueNumber) {
        Booking booking = bookingRepository
            .findByUserEmailAndEventEventUniqueNumber(userEmail, eventUniqueNumber)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Refund tickets back to event
        Event event = booking.getEvent();
        event.setRemainingTickets(event.getRemainingTickets() + booking.getTicketsBooked());
        eventRepository.save(event);

        bookingRepository.delete(booking);
    }
}
