import axiosAuthorized from "../Helpers/AuthInterceptor";
import { apiUrl } from "../constants/proxy";
import userService from "./UserService";

class PeriodPickerService {
    getLogsInPeriod(from, to) {
        const postData = {
            from: from,
            to: to,
            userId: userService.getUserId()
        }
        return axiosAuthorized.post(`${apiUrl}/logs/get/period`, postData);
    }
    getToday() {
        let today = new Date();
        return today;
    }

    getMonthAgo() {
        let today = new Date();
        let monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        return monthAgo;
    }
}

const periodPickerService = new PeriodPickerService();

export default periodPickerService;