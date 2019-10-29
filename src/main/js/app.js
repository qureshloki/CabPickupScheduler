import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import BookingScreen from "./components/bookingScreen";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
        	<BookingScreen />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
