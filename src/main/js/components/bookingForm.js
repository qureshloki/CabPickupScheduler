import React from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import bookingService from "../services/bookingService";
import Form from "./common/form";

class BookingForm extends Form {

  schema = {
    custName: Joi.string()
      .min(4)
      .max(40)
      .required()
      .label("Customer Name"),
    latitude: Joi.number()
      .required()
      .min(-90)
      .max(90)
      .label("Pickup Latitude"),
    longitude: Joi.number()
      .required()
      .min(-180)
      .max(180)
      .label("Pickup Longitude")
  };

  doSubmit = async () => {
    const { custName, latitude, longitude } = this.state.data;
    try {
      await bookingService.createBooking({custName, latitude, longitude});
      this.props.onBooked();
    } catch (ex) {
    	console.log(ex);
    	if (ex.response && ex.response.data)
            toast.error(ex.response.data.message);
    }
  };

  render() {
	const { isLoading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
      	<div className="row">
      		<div className="col">
        		{this.renderInput("custName", "Customer Name")}
        	</div>
        	<div className="col">
        		{this.renderInput("latitude", "Pickup Latitude")}
        	</div>
            <div className="col">
           		{this.renderInput("longitude", "Pickup Longitude")}
      	    </div>
      	    <div className="col">
      	    	{this.renderSubmit("bookBtn", "Book Cab", isLoading)}
      	    </div>
      	</div>
      </form>
    );
  }
}

BookingForm.propTypes = {
  onBooked: PropTypes.func,
  isLoading: PropTypes.bool
};

export default BookingForm;
