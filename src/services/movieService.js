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

export function updateMovie(movie,_id) {
     return http.put(`${apiUrl}/${path}/${_id}`,movie);
}

export function createMovie(movie) {
    return http.post(`${apiUrl}/${path}`,movie);
}
