import http from "./httpService";

const apiEndpoint = "/bookings";

export async function createBooking(booking) {
  let result = await http.post(apiEndpoint, booking);
  return result;
}

export default {
	createBooking
};
