package com.loginext.pickupscheduler.drivers;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import com.loginext.pickupscheduler.bookings.Booking;

@Entity
public class Driver {

	public enum Status {avl, bsy};
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable=false)
	private String name;
	@Column(nullable=false)
	private Double latitude;
	@Column(nullable=false)
	private Double longitude;
	@Column(nullable=false)
	@Enumerated(EnumType.STRING)
	private Status status;
	@OneToOne
    @JoinColumn(name = "currentBookingId", referencedColumnName = "id")
	private Booking currentBooking;

	public Driver() {}

	public Driver(String name, Double latitude,Double longitude) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public Long getId() {
		return id;
	}

	protected void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	
	public Booking getCurrentBooking() {
		return currentBooking;
	}
	
	public void setCurrentBooking(Booking currentBooking) {
		this.currentBooking = currentBooking;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
