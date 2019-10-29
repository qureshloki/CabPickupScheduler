package com.loginext.pickupscheduler.bookings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.loginext.pickupscheduler.drivers.DriverAvailabilityException;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
	@Autowired
	private BookingService bookingSvc;

	@RequestMapping(value = "")
    public Iterable<Booking> getBookings() {
		return bookingSvc.getBookings();
    }
	
	@RequestMapping(value = "", method=RequestMethod.POST)
    public Booking createBooking(@RequestBody Booking booking) throws DriverAvailabilityException {
		return bookingSvc.createBooking(booking);
    }
}
