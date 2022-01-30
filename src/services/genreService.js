import http from "./httpService";
import {moviesServiceUrl,movieApiKey} from "./../config.json"

const apiUrl = process.env.REACT_APP_API_URL;

export function getGenres() {
    return http.get(`${apiUrl}/genres`)
}

export function getGenresFromWebservices() {
    return http.get(`${moviesServiceUrl}/genre/movie/list?api_key=${movieApiKey}`)
}


