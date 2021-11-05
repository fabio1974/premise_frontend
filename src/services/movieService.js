import http from "./httpService";
import {apiUrl, movieApiKey, moviesServiceUrl} from "./../config.json"

const path = 'movies'

export function getMovies() {
    return http.get(`${apiUrl}/${path}`)
}

export function getMoviesFromExternalWebserviceByGenre(genreId) {
    return http.get(`${moviesServiceUrl}/discover/movie/?api_key=${movieApiKey}&with_genres=${genreId}`)
}

export function getMoviesFromExternalWebservice() {
    return http.get(`${moviesServiceUrl}/discover/movie/?api_key=${movieApiKey}`)
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
