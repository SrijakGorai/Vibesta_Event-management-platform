package com.vibesta.controller;

import com.vibesta.model.Booking;
import com.vibesta.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/{uniqueNumber}/book")
    public Booking bookEvent(
            @PathVariable String uniqueNumber,
            @RequestParam int tickets) {  // <-- changed
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return bookingService.bookTickets(userEmail, uniqueNumber, tickets);
    }


    @GetMapping("/bookings")
    public List<Booking> getUserBookings() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return bookingService.getBookingsByUser(userEmail);
    }

    @GetMapping("/admin/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
    //new change
    @DeleteMapping("/{eventUniqueNumber}/cancel")
    public String cancelBooking(@PathVariable String eventUniqueNumber) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        bookingService.cancelBooking(userEmail, eventUniqueNumber);
        return "Booking cancelled successfully";
    }


}
