import axios from "axios";
import userService from "../services/UserService";

const axiosAuthorized = axios.create();

axiosAuthorized.interceptors.request.use(config => {
    const accessToken = userService.getUserToken();
  
    //if token is found add it to the header
    if (accessToken) {
      if (config.method !== 'OPTIONS') {
            config.headers.authorization = `Bearer ${accessToken}`;
          }
    }
    return config;
  }, err => this.$router.replace('error'));
  
  export default axiosAuthorized;