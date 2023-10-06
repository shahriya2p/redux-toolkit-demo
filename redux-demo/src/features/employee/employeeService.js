import axios from 'axios';

const apiURL = "http://localhost:5000";

export const getEmpService = () => axios.get(`${apiURL}/emp`).then(response => response);
export const addEmpService = (empObj) => axios.post(`${apiURL}/emp`, empObj).then(response => response);
export const deleteEmpService = (id) => {
    return axios.delete(`${apiURL}/emp/${id}`).then(response => response);
}
export const updateEmpService = (id, empObj) => {
    return axios.patch(`${apiURL}/emp/${id}`, empObj).then(response => response);
}