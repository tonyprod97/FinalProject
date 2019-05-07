class AuthService {
    isUserLoggedIn() {
        return localStorage.getItem('user');
    }
    logout(){
        localStorage.removeItem('user');
    }
}
const authService = new AuthService();

export default authService;