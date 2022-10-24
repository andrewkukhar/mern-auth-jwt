import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username) {
        return axios
            .post(API_URL + "signin", {
                username
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email,) {
        return axios.post(API_URL + "signup", {
            username,
            email
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();