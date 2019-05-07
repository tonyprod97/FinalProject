import axiosAuthorized from "../Helpers/AuthInterceptor";
import { apiUrl } from "../constants/proxy";
import userService from "./UserService";
import Log from "../Models/Log";

class LogService {
    constructor() {
        this.activeLog = new Log(null,null,new Date());
    }
    submit(postData) {
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