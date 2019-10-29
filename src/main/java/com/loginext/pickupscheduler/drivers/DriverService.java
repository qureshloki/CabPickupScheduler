package com.loginext.pickupscheduler.drivers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

	@Autowired
	private DriverRepository driverRepository;
	
	public Iterable<Driver> getDrivers(){
		return driverRepository.findAll();
	}
	
	public List<Driver> getAvailableDrivers(){
		return driverRepository.findByStatus(Driver.Status.avl);
	}
	
	public Driver updateDriver(Driver driver){
		return driverRepository.save(driver);
	}
	
	
}
