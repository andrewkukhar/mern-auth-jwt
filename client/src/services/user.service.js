import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getStaffBoard() {
        return axios.get(API_URL + 'staff', { headers: authHeader() });
    }

    getVolunteerBoard() {
        return axios.get(API_URL + 'volunteer', { headers: authHeader() });
    }

    getCompanyBoard() {
        return axios.get(API_URL + 'company', { headers: authHeader() });
    }
}

export default new UserService();