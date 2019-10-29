import axios from "axios";
import { toast } from "react-toastify";


//set the base url
axios.defaults.baseURL = "http://localhost:8080/api";

//add response interceptor to log unexpected error
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    console.log(error);
    toast.error("An unexpected error occured !");
  }
  return Promise.reject(error);
});


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
