import {adminInstance} from './main'
import {errorNotify} from "../utils/main";

const UploadApi = {

    uploadUser(formData) {

        return adminInstance
            .post(`/user/file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .catch(() => errorNotify('Ошибка при загрузке картинки!'))

    }

}

export default UploadApi