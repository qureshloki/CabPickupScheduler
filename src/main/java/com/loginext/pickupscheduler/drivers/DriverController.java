package com.loginext.pickupscheduler.drivers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
	@Autowired
	private DriverService driverSvc;
	@RequestMapping("")
    public Iterable<Driver> getDrivers() {
        return driverSvc.getDrivers();
    }
	
	@RequestMapping(value = "/{id}", method=RequestMethod.PUT)
    public Driver updateDriver(@PathVariable Long id, @RequestBody Driver driver) {
		driver.setId(id);
		return driverSvc.updateDriver(driver);
    }
}
