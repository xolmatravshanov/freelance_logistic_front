import React from 'react'
import Edit from './Edit'
import Create from './Create'
import View from './View'

import BreadCrumb from '../../../../components/app/BreadCrumb'
import classes from '../../../../components/app/Layout.module.css'
import DynaGrid from '../../../../components/DynaGrid/Index'
import {Helmet} from "react-helmet";

const Index = () => {

    const DataCrumb = [
        {
            key: 'order',
            url: '/employee/order',
            title: 'Перевозки'
        },
    ]

    const labels = {
        id: 'ID',
        name: 'Название',
        title: 'Заголовок',
        message: 'Сообщения',
        type: 'Тип',
    }

    const columns = [
        {
            title: labels['name'],
            dataIndex: 'name',
            sorter: true,
            align: 'center',
        },
        {
            title: labels['title'],
            dataIndex: 'title',
            sorter: true,
            align: 'center',
        },
        {
            title: labels['type'],
            dataIndex: 'type',
            sorter: true,
            align: 'center',
        },
        {
            title: labels['message'],
            dataIndex: 'message',
            sorter: true,
            align: 'center',
            ellipsis: true,
        },
    ]

    return (
        <>
            <Helmet title="Тип сообщений" />
            <div className={classes.breadCrumb}>
                <BreadCrumb data={DataCrumb}/>
            </div>
            <DynaGrid
                columns={columns}
                labels={labels}
                url='sms-temp'
                delete
                tableName='Тип сообщений'
                createTitle='Добавить Сообщений'
                viewTitle='Данные сообщения №{id}'
                updateTitle='Редактировать данные сообщения №{id}'
                editContent={(record) => <Edit record={record}/>}
                createContent={(record) => <Create record={record}/>}
                viewContent={(record, labels) => <View record={record} labels={labels} />}
                deleteAllUrl='/sms-temp/delete-all'
            />
        </>
    )
}

export default Index
