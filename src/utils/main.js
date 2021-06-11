import {Modal, notification} from 'antd'
import React from "react";

export const errorModal = (message = 'Ошибка получения данных', title='Ошибка') => {
    Modal.error({
        title: title,
        content: message,
    })
}

export const errorNotify = (message = 'Ошибка получения данных', title='Ошибка') => {
    notification['error']({
        message: title,
        description: message,
    })
}

export const successNotify = (message = 'Данные успешно получены', title='Отлично') => {
    notification['success']({
        message: title,
        description: message,
    })
}

export const warningNotify = (message = 'Данные могут быть неверными', title='Предупреждение') => {
    notification['warning']({
        message: title,
        description: message,
    })
}

export const emptyText = (text = '(Не задано)') => {
    return <small style={{opacity:'.7'}}><i>{text}</i></small>
}