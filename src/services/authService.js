import http from "./httpService";
import {apiUrl} from "./../config.json"
import jwtDecode from "jwt-decode";
import LogRocket from "logrocket";
import logRocket from "../components/security/logRocket";

const path = 'auth'
const token = 'token'

http.setJwt(getJwt())

export async function login(user) {
    const {data:jwt} = await http.post(`${apiUrl}/${path}`,{
        email:user.username,
        password: user.password,
    });
    localStorage.setItem(token,jwt)
}

export function loginRegister(jwt){
    localStorage.setItem(token,jwt)
}

export function logout(){
    localStorage.removeItem(token)
}

export function getCurrenUser(){
    try {
        const jwt = localStorage.getItem(token);
        return jwtDecode(jwt)
    }catch (e) {
        return null
    }
}

export function getJwt(){
    return localStorage.getItem(token);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    logout,
    getCurrenUser,
    loginRegister,
    getJwt
}
