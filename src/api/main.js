import axios from "axios"

export const adminInstance = axios.create({
    baseURL: process.env.REACT_APP_PRODUCTION_PATH ? process.env.REACT_APP_PRODUCTION_PATH :"http://api-ntl.dev.elsa.uz/",
    responseType: "JSON",
})

adminInstance.interceptors.request.use(
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

adminInstance.interceptors.response.use(

    (response) => {
        return response
    },

    function (error) {

        let status = (error.response && error.response.status) || 0

        if (status === 401) {
            localStorage.clear()
            window.location = '/login'
        } else {
            throw error
        }

    }
)
