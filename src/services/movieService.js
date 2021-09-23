import http from "./httpService";
import {apiUrl} from "./../config.json"

const path = 'movies'

export function getMovies() {
    return http.get(`${apiUrl}/${path}`)
}

export function getMovie(id) {
    return http.get(`${apiUrl}/${path}/${id}`)
}

export function deleteMovie(id) {
    return http.delete(`${apiUrl}/${path}/${id}`)
}

export function saveMovie(movie) {
    if(movie._id){
        const body= {...movie};
        delete body._id
        return http.put(`${apiUrl}/${path}/${movie._id}`,body);
    }
    return http.post(`${apiUrl}/${path}`,movie);
}
