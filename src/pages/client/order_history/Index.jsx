import React, {useEffect, useState} from 'react'
import Edit from '../order/Edit'
import Create from '../order/Create'
import View from '../order/View'
import Table from '../../../components/Table/Index'
import Dyna from "../../../api/dyna";
import * as Ramda from "ramda";
import {emptyText} from "../../../utils/main";
import {statuses} from "../../../consts/consts";

const Index = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        Dyna.getAllData('user')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    const labels = {
        id: 'id',
        number_work: 'Номер Работы',
        user_id: 'Клиенты',
        distance: 'Дистанция',
        place: 'Место',
        container: 'Номер контейнера',
        status: 'Статус',
        order_created_at: 'Время создания',
        updated_at: 'Время изменения',
    }

    const columns = [

        {
            title: labels['number_work'],
            dataIndex: 'number_work',
            sorter: true,
            align: 'center',
            width: '130px'
        },
        {
            title: labels['user_id'],
            dataIndex: 'user_id',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '100px',
            render: value => {

                if (users.length > 0 && value) {
                    const result = Ramda.find(Ramda.propEq('id', value))(users)
                    if (result) {
                        return result.name
                    }
                }

                return emptyText()
            }
        },
        {
            title: labels['container'],
            dataIndex: 'container',
            sorter: true,
            align: 'center',
            width: '130px'
        },
        {
            title: labels['place'],
            dataIndex: 'place',
            sorter: true,
            align: 'center',
            width: '200px'
        },
        {
            title: labels['distance'],
            dataIndex: 'distance',
            sorter: true,
            ellipsis: true,
            align: 'center',
            width: '130px'
        },
        {
            title: labels['status'],
            dataIndex: 'status',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '200px',
            render: value => {
                const result = Ramda.find(Ramda.propEq('key', value))(statuses)
                if (result) {
                    return result.value
                }
            }
        },
        {
            title: labels['updated_at'],
            dataIndex: 'updated_at',
            sorter: true,
            align: 'center',
            width: '200px',
            render: value => {
               if (value) {
                   return  value.replace(/[0-9]{2}:[0-9]{2}:[0-9]{2}/, '');
               }
            }
        },
    ]

    return (
        <div style={{marginTop: '20px'}}>
            <Table
                paramsData={{
                    id: props.id
                }}
                columns={columns}
                labels={labels}
                isClick={false}
                url='order-history/client-update'
                tableName={`История перевозки № ${props.id}`}
                createTitle='Добавить перевозку'
                viewTitle='Данные перевозки №{id}'
                updateTitle='Редактировать данные перевозки №{id}'
                editContent={(record) => <Edit record={record}/>}
                createContent={(record) => <Create record={record}/>}
                viewContent={(record, labels) => <View record={record} labels={labels}/>}
            />
        </div>
    )
}

export default Index
