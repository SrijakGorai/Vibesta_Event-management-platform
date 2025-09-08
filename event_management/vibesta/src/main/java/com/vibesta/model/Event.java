package com.vibesta.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String eventUniqueNumber;

    @Column(nullable = false)
    private String eventName;

    @Column(nullable = false)
    private LocalDate eventDate;

    @Column(length = 1000)
    private String eventDetails;

    @Column(nullable = false)
    private int totalTickets;

    @Column(nullable = false)
    private int remainingTickets;
    @Column(nullable = false)
    private int maxTicketsPerUser;

}
