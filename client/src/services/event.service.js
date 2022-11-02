import axios from 'axios';
//import authHeader from './auth-header';

const API_URL = '/api/test/user/events/';

class EventDataService {
  create(data) {
    return axios.post(API_URL, data);
  }
  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(API_URL + `${id}`);
  }

  update(id, data) {
    return axios.put(API_URL + `${id}`, data);
  }

  delete(id) {
    return axios.delete(API_URL + `${id}`);
  }

  deleteAll() {
    return axios.delete(API_URL);
  }

}

export default new EventDataService();