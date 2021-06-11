import {adminInstance} from './main'
import {errorNotify} from '../utils/main'

export default {

    getAllData(url) {

        return adminInstance
            .get(`/${url}/get-all-data`)

    },

    getDataByUrl(url, params) {

        return adminInstance
            .get(`/${url}`, {
                params: params,
            })

    },

    getData(url, params = null, paramsData = []) {

        let data = {
            page: 1,
            "per-page": 50,
        }

        if (params) {
            data = {
                page: params.page,
                'per-page': params['per-page'],
                sort: params.sort,
            }
        }

        return adminInstance
            .get(`/${url}/get-data`, {
                params: {
                    ...data,
                    ...paramsData
                },
            })
            .catch(() => errorNotify())

    },

    getDatas(url, params = null, paramsData = []) {

        let data = {
            page: 1,
            "per-page": 50,
        }

        if (params) {
            data = {
                page: params.page,
                'per-page': params['per-page'],
                sort: params.sort,
            }
        }

        return adminInstance
            .get(`/${url}`, {
                params: {
                    ...data,
                    ...paramsData
                },
            })
            .catch(() => errorNotify())

    },

    updateRow(url, formData, id) {

        return adminInstance
            .post(`/${url}/update?id=${id}`, formData).then((resolve) => {
                window.location.reload()
            }, (reject) => {

                let error = reject.response.data;

                if (error) {
                    for (const [key, value] of Object.values(error)) {
                        return errorNotify(reject.response.data)
                    }
                }

            })

    },

    getRow(url, id) {
        return adminInstance
            .get(`/${url}?id=${id}`);
    },

    getDataFromDate(url, formData) {
        return adminInstance
            .post(`/${url}`, formData);
    },

    universalAction(url, params = null) {
        let data = {
            page: 1,
            "per-page": 50,
        }

        if (params) {
            data = {
                page: params.page,
                'per-page': params['per-page'],
                sort: params.sort,
            }
        }

        return adminInstance
            .get(`/${url}`, {
                params: data,
            })
            .catch(() => errorNotify());
    },


    create(url, formData, error) {
        return adminInstance
            .post(`/${url}/create`, formData).then((resolve) => {
                window.history.back();
            }, (e) => {
                let error = e.response.data;
                if (Array.isArray(error)) {
                    return errorNotify(error[0].message);
                } else {
                    if (error) {
                        for (const [key, value] of Object.values(error)) {
                            return errorNotify(key)
                        }
                    }
                }

            })
    },

    deleteRows(url, rows) {

        return adminInstance
            .post(`/${url}/delete-all`, {
                checks: rows
            })

    },

}