import http from "./httpService";

const apiEndpoint = "/drivers";

export async function getDrivers() {
  let result = await http.get(apiEndpoint);
  return result;
}

export default {
	getDrivers
};
