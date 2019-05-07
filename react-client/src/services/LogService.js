import axiosAuthorized from "../Helpers/AuthInterceptor";
import { apiUrl } from "../constants/proxy";
import userService from "./UserService";

class LogService {
   
    submit(postData) {
        //if postData.id exists new log is being created otherwise it's being updated
        return postData.id ? this.update(postData) : this.create(postData);
    }

    update(postData) {
        return axiosAuthorized.post(`${apiUrl}/logs/update`, postData);
    }
    create(postData) {
        delete postData.id;
        return axiosAuthorized.post(`${apiUrl}/logs/create`, postData);
    }

    delete(id) {
        return axiosAuthorized.delete(`${apiUrl}/logs/${id}`);
    }
    getAllLogs() {
        return axiosAuthorized.get(`${apiUrl}/logs/get/${userService.getUserId()}`)
    }
    statistic(postData) {
        return axiosAuthorized.post(`${apiUrl}/logs/statistic`, postData);
    }
}
const logService = new LogService();

export default logService;