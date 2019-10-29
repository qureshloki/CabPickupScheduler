package com.loginext.pickupscheduler.bookings;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.loginext.pickupscheduler.drivers.Driver;
import com.loginext.pickupscheduler.drivers.DriverAvailabilityException;
import com.loginext.pickupscheduler.drivers.DriverService;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	private DriverService driverSvc;
	
	public Iterable<Booking> getBookings(){
		return bookingRepository.findAll();
	}
	
	@Transactional
	public Booking createBooking(Booking booking) throws DriverAvailabilityException {
		Driver driver = getDriver(booking);
		booking = bookingRepository.save(booking);
		driver.setCurrentBooking(booking);
		driver.setStatus(Driver.Status.bsy);
		driverSvc.updateDriver(driver);
		return booking;
	}
	
	/**
	 * 
	 * @param booking The booking for which to assign a driver
	 * @return the assigned driver. The available driver closest to the pickup point of the booking is assigned.
	 * @throws DriverAvailabilityException exception if no drivers are currently available
	 */
	private Driver getDriver(Booking booking) throws DriverAvailabilityException {
		List<Driver> drivers = driverSvc.getAvailableDrivers();
		
		if(drivers.size() == 0) {
			//currently to keep db/ui/logic simple, we are only assigning driver if there are available drivers.
			//however, we could modify the database design, such that each booking has a "assignedDriver" & "status" field & is assigned a driver & status (e.g. pending or completed),
			//even if there are no drivers currently available;
			//in that case, the "distanceFromPickupPoint" for a driver could be the cumulative distance of all pending trips of the driver)
			throw new DriverAvailabilityException("No available drivers, please try booking after some time !");
		}
		
		Double minDistance = Double.POSITIVE_INFINITY;
		Driver assignedDriver = null;
		for(Driver drv: drivers) {
			double distFromPickupPt = calculateDistance(booking.getLatitude(),booking.getLongitude(),
					drv.getLatitude(),drv.getLongitude());
			if(distFromPickupPt < minDistance) {
				minDistance = distFromPickupPt;
				assignedDriver = drv;
			}
		}
		return assignedDriver;
	}
	
	/*
	 * treat latitude,longitude as point x,y & calc distance between 2 points using formula sqrt( (x2-x1)^2 + (y2-y1)^2)
	 * we dont care about the unit, since we just want to find minimum dist, which is relative
	 */
	private Double calculateDistance(double lat1, double lng1,double lat2, double lng2) {
		return Math.sqrt(Math.pow(lat1-lat2, 2)+Math.pow(lng1-lng2, 2));
	}
}
