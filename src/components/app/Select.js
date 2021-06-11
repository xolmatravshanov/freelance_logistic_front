import React from 'react'
import { Select } from 'antd/lib'
const {Option} = Select

const Index = () => {

    const status_logistics = [
        {
            key: 'new',
            value: 'Новый',
        },
        {
            key: 'cancelled',
            value: 'Отменен колл центром',
        },
        {
            key: 'complect_wait',
            value: 'В ожидании комплектации',
        },
        {
            key: 'on_complecting',
            value: 'На комплектации',
        },
        {
            key : 'notset',
            value : 'Не комплект',
        },
        {
            key : 'shipment_ready',
            value : 'Готов к отгрузке',
        },
        {
            key : 'courier_appointment',
            value : 'К назначению курьера',
        },
        {
            key :'reported',
            value : 'Передан в подотчёт',
        },
        {
            key : 'completed',
            value : 'Выполнена оплата',
        },
        {
            key : 'part_paid',
            value : 'Частичный выкуп',
        },
        {
            key : 'part_refunded',
            value : 'Возврат частично',
        },
        {
            key : 'delivery_failure',
            value : 'Отказ во время доставки',
        },
        {
            key : 'delivery_transfer',
            value : 'Перенос даты доставки',
        },
        {
            key : 'cancel',
            value : 'Отменено',
        },
        {
           key : 'annulled',
           value : 'Аннулирован',
        }
    ]

    return (
        <Select>
            {
                status_logistics.map(item => (
                    <Option value={item.key}>{item.value}</Option>
                ))
            }
        </Select>
    );
};
export default Index