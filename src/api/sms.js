import {adminInstance} from './main'
import {errorNotify} from "../utils/main";

const Sms = {

    sendSmsByUser(url,  formData){
        return adminInstance
            .post(`${url}`,formData )
            .catch(() => errorNotify('произошла ошибка отправки смс и электронной почты'))
    },

    getSmsOrders(url,  formData){
        return adminInstance
            .get(`${url}`,formData )
            .catch(() => errorNotify('произошла ошибка отправки смс и электронной почты'))
    }

}

export default Sms
