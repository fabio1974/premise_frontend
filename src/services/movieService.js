import http from "./httpService";
import apiUrl from "./../config.json"

export function getMovies() {
    return http.get(`${apiUrl}/movies`)
}

export function getMovie(id) {
    return http.get(`${apiUrl}/movies/${id}`)
}

export function deleteMovie(id) {
    return http.delete(`${apiUrl}/movies/${id}`)
}

export function saveMovie(movie) {
    if(movie._id){
        const body= {...movie};
        delete body._id
        return http.put(`${apiUrl}/movies/${movie._id}`,body);
    }
    return http.post(`${apiUrl}/movies`,movie);
}

