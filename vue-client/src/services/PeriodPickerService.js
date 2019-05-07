import axiosAuthorized from "../Helpers/AuthInterceptor";
import { apiUrl } from "../constants/proxy";
import userService from "./UserService";

class PeriodPickerService {
    getLogsInPeriod(from,to) {
        const postData = {
            from: from,
            to: to,
            userId: userService.getUserId()
        }
        return axiosAuthorized.post(`${apiUrl}/logs/get/period`, postData);
    }
}

const periodPickerService = new PeriodPickerService();

export default periodPickerService;