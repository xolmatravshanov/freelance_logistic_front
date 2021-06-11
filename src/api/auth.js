import {errorNotify} from "../utils/main";
import axios from "axios";
import {adminInstance} from "./main";

export const authInstance = axios.create({
    baseURL: process.env.REACT_APP_PRODUCTION_PATH ? process.env.REACT_APP_PRODUCTION_PATH :"http://localhost/ntl/web",
    responseType: "JSON",

})

authInstance.interceptors.request.use(
    (config) => {

        if (!config.headers['Content-Type'])
            config.headers['Content-Type'] = 'application/json'

        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config

    },

    (error) => {
        Promise.reject(error)
    }
)

const Auth = {

    login(formData) {
        return authInstance
            .post('/user/login', formData)
            .catch(err => err)
    },

    register(formData) {
        return authInstance
            .post('/user/create', {
                data: formData
            })
            .catch(err => err)
    },

    getUser() {
        return authInstance
            .get(`/user/get-user`)
            .catch(err => err)
    },

    test() {
        return authInstance
            .get(`/user/role`)
            .catch(err => err)
    },

    updateUser(url, formData) {

        return authInstance
            .post(`/${url}/update-user`, {
                data: formData
            })
            .catch(() => errorNotify('Возникла ошибка при изменении данных'))

    },


}

export default Auth