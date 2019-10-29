import React, { Component } from "react";
import DriversTable from "./driversTable";
import { getDrivers } from "../services/driverService";
import BookingForm from "./bookingForm";
import _ from "lodash";

class BookingScreen extends Component {
  state = {
    drivers: [],
    isLoading: false
  };

  async loadDrivers() {
    this.setState({ isLoading: true });
    try {
      const { data: drivers } = await getDrivers();
      this.setState({ drivers, isLoading: false });
    } catch (ex) {
      console.log("exception=" + ex);
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount() {
    await this.loadDrivers();
  }

  render() {
    const { drivers, isLoading } = this.state;
    return (
      <React.Fragment>
        <div className="row align-items-center mt-3">
          <BookingForm
          	onBooked={this.loadDrivers.bind(this)}
            isLoading={isLoading}
          />
        </div>

        <div className="row align-items-center mt-3">
          {drivers.length === 0 && (
            <p>There are no Drivers in the system.</p>
          )}

          {drivers.length > 0 && (
              <DriversTable
              	drivers={drivers}
              />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default BookingScreen;
