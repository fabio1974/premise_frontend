import http from "./httpService";
import {apiUrl} from "./../config.json"

const path = 'auth'


export function login(user) {
    return http.post(`${apiUrl}/${path}`,{
        email:user.username,
        password: user.password,
    });
}

