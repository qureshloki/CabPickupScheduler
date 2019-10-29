import React, { Component } from "react";
import PropTypes from "prop-types";

class Table extends Component {
  render() {
	  return (
	    <table className="table">
		    <thead>
		        <tr>
		          {this.props.columns.map(column => (
		            <th key={column.path}>
		              {column.label}
		            </th>
		          ))}
		        </tr>
		    </thead>
		    <tbody>
		        {this.props.data.map(item => (
		          <tr key={item.id}>
		            {this.props.columns.map(column => (
		              <td key={item.id + column.path}>
		                {_.get(item, column.path)}
		              </td>
		            ))}
		          </tr>
		        ))}
	        </tbody>
	    </table>
	  );
  }  
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string
    })
  ),

  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number
    })
  )
};

export default Table;
