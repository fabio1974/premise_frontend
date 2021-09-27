import http from "./httpService";
import {apiUrl,moviesServiceUrl,movieApiKey} from "./../config.json"

export function getGenres() {
    return http.get(`${apiUrl}/genres`)
}

export function getGenresFromWebservices() {
    return http.get(`${moviesServiceUrl}/genre/movie/list?api_key=${movieApiKey}`)
}


