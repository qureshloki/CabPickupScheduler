import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./common/table";

class DriversTable extends Component {
  columns = [
	{ path: "id", label: "Driver Id"},
    { path: "name", label: "Driver"},
    { path: "currentBooking.custName", label: "Customer" },
    { path: "status", label: "status" }
  ];

  render() {
    const { drivers } = this.props;

    return (
      <Table
        columns={this.columns}
        data={drivers}
      />
    );
  }
}

DriversTable.propTypes = {
  drivers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      status: PropTypes.string,
      currentBooking: PropTypes.shape({
    	  custName: PropTypes.string
      })
    })
  )
};

export default DriversTable;
