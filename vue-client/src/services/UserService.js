import Axios from "axios";

class UserService {
    getUserId() {
        return JSON.parse(localStorage.getItem('user')).id;
    }

    getUserToken() { 
        return JSON.parse(localStorage.getItem('user')).token;
    }

    submitForm(url, data) {
        return Axios.post(url,data);
    }
}
const userService = new UserService();

export default userService;