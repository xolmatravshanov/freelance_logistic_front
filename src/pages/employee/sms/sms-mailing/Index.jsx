import React, {useEffect, useState} from 'react'
import {Button, Modal} from 'antd'
import Sms from '../../../../api/sms'
import Dyna from '../../../../api/dyna'
import * as Ramda from 'ramda'
import {emptyText} from '../../../../utils/main'
import {statuses} from '../../../../consts/consts'
import BreadCrumb from "../../../../components/app/BreadCrumb";
import {Link} from "react-router-dom";
import classes from '../../../../components/app/Layout.module.css'
import Table from '../../../../components/Table/Index'
import {Helmet} from "react-helmet";
import {setData, setLoading, setPagination} from "../../../../store/dyna/actions";
import {connect} from "react-redux";
const {confirm} = Modal;

const Index = props => {

    const {data, setData, loading, setLoading, setPagination} = props


    const labels = {
        id: 'ID',
        user_id: 'Клиенты',
        status: 'Статус',
        container: 'Номер контейнера',
        place: 'Место',
        distance: 'Дистанция',
        created_at: 'Время создания',
        updated_at: 'Время изменения',
    }

    const [users, setUsers] = useState([])

    useEffect(() => {
        Sms.getSmsOrders('/order/order-sms')
            .then(({data}) => {
                setData(data.content);
                setLoading(false)
                setPagination({
                    current: data['page'],
                    pageSize: data['pageSize'],
                    total: data['totalCount'],
                })
            })

        Dyna.getAllData('user')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    const columns = [
        {
            title: labels['user_id'],
            dataIndex: 'user_id',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '130px',
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
            width: '130px'
        },

        {
            title: labels['distance'],
            dataIndex: 'distance',
            sorter: true,
            align: 'center',
            width: '130px'
        },
        {
            title: labels['created_at'],
            dataIndex: 'created_at',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '200px'
        },

    ]

    const breadCrumbData = [
        {
            key: 'main',
            url: '/',
            title: 'Главная'
        },
        {
            key: 'sms-temp',
            url: '/employee/sms-mailing',
            title: 'Рассылки',
            active: true,
        },
    ]

    function showConfirm() {
        confirm({
            title: 'смс будут отправлены все перевозки здесь',
            content: 'Уверены ли вы',
            okText: 'Отправить',
            cancelText: 'Отмена',

            onOk() {
                Sms.getSmsOrders('/sms/send-sms-order').then(() => {

                });
            },

            onCancel() {

            },
        });
    }


    return (
        <>
            <Helmet title="Смс отправка" />
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
                <div style={{ marginBottom:'10px' }}>
                    <Button onClick={showConfirm} type={'primary'} style={{ marginRight:'20px' }}>Отправить SMS для перевозок</Button>
                    <Link to={`${props.match.url}/create`}>
                        <Button type={'default'} danger>SMS рассылки</Button>
                    </Link>
                </div>
            </div>
            <Table
                dataSource={data}
                isClick={false}
                columns={columns}
                labels={labels}
                url='order/order-sms'
                tableName='Смс отправка'
            />
        </>
    )
}


const states = state => ({
    data: state.dyna.data,
    loading: state.dyna.loading,
})

const actions = {
    setData,
    setLoading,
    setPagination
}

export default connect(states, actions)(Index)
