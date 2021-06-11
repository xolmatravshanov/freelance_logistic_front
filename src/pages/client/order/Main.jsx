import React from 'react'

import DynaGrid from '../../../components/DynaGrid/Index'
import Edit from './Edit'
import Create from './Create'
import View from './View'
import BreadCrumb from '../../../components/app/BreadCrumb'
import classes from '../../../components/app/Layout.module.css'

const Index = () => {

    const DataCrumb = [
        {
            key: 'home',
            url: '/employee/order',
            title: 'Главная'
        },
        {
            key: 'order',
            url: '/employee/order',
            title: 'Перевозки'
        },
    ]

    const labels = {
        id: 'ID',
        number: 'Номер перевозки',
        contact_name: 'Имя клиента',
        contact_phone: 'Телефон номер клиента',
        status_logistics: 'Статус логистики',
        status_callcenter: 'Статус колл-центра',
        comment_agent: 'Комментарий оператора',
        date_deliver: 'Дата доставки',
        time_deliver: 'Время доставки',
    }

    const columns = [
        {
            title: labels['id'],
            dataIndex: 'id',
            sorter: true,
            align: 'center',
            width: '80px',
        },
        {
            title: labels['number'],
            dataIndex: 'number',
            sorter: true,
            align: 'center',
            width: '150px'
        },
        {
            title: labels['contact_name'],
            dataIndex: 'contact_name',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '200px'
        },
        {
            title: labels['contact_phone'],
            dataIndex: 'contact_phone',
            sorter: true,
            ellipsis: true,
            align: 'center',
            width: '200px'
        },
        {
            title: labels['status_logistics'],
            dataIndex: 'status_logistics',
            sorter: true,
            align: 'center',
            width: '200px'
        },
        {
            title: labels['status_callcenter'],
            dataIndex: 'status_callcenter',
            sorter: true,
            ellipsis: true,
            align: 'center',
            width: '200px'
        },
        {
            title: labels['comment_agent'],
            dataIndex: 'comment_agent',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '200px'
        },
        {
            title: labels['date_deliver'],
            dataIndex: 'date_deliver',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '200px'
        },
        {
            title: labels['time_deliver'],
            dataIndex: 'time_deliver',
            sorter: true,
            align: 'center',
            width: '200px'
        },
    ]

    return (
        <>
            <div className={classes.breadCrumb}>
                <BreadCrumb data={DataCrumb}/>
            </div>
            <DynaGrid
                columns={columns}
                labels={labels}
                url='order'
                tableName='Перевозки'
                createTitle='Добавить Перевозку'
                viewTitle='Данные Перевозки №{id}'
                updateTitle='Редактировать данные Перевозки №{id}'
                editContent={(record) => <Edit record={record}/>}
                createContent={(record) => <Create record={record}/>}
                viewContent={(record, labels) => <View record={record} labels={labels}/>}
                deleteAllUrl=''
            />
        </>
    )
}

export default Index