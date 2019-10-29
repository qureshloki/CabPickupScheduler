package com.loginext.pickupscheduler.drivers;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.loginext.pickupscheduler.drivers.Driver.Status;


public interface DriverRepository extends CrudRepository<Driver, Long>{

	List<Driver> findByStatus(Status avl);
}

