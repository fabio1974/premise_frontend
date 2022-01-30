import http from "./httpService";
//import {apiUrl} from "./../config.json"

const apiUrl = process.env.REACT_APP_API_URL;
const path = 'users'

export function getMovies() {
    return http.get(`${apiUrl}/${path}`)
}

export function getMovie(id) {
    return http.get(`${apiUrl}/${path}/${id}`)
}

export function deleteMovie(id) {
    return http.delete(`${apiUrl}/${path}/${id}`)
}

export function register(user) {
    return http.post(`${apiUrl}/${path}`,{
        email:user.username,
        password: user.password,
        name:user.name
    });
}

