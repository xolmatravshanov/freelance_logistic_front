import React, {useEffect, useState} from 'react'
import {Form} from "antd/lib"
import {connect} from 'react-redux'
import {setData, setLoading, showCreateModal} from '../../../store/dyna/actions'
import EditForm from './Form'
import DynaApi from '../../../api/dyna'
import classes from '../../../components/app/Layout.module.css'
import BreadCrumb from '../../../components/app/BreadCrumb'
import {errorNotify} from "../../../utils/main";
import * as Ramda from "ramda"
import {Spin} from "antd"
import {Helmet} from "react-helmet";

const Create = props => {

    const {
        showCreateModal,
        setLoading,
        setData,
    } = props

    const [form] = Form.useForm();

    const [users, setUsers] = useState([])

    useEffect(() => {
        DynaApi.getAllData('user')
            .then(({data}) => {
                setUsers(data)
            })
            .catch(() => errorNotify('Ошибка при выводе клиентов из базы данных'))
    }, [form, props.record])

    const onFinish = fieldsValue => {

        DynaApi.create('order', fieldsValue)
            .then(() => {
                DynaApi.getData('order')
                    .then(({data}) => {
                        setData(data.content)
                        setLoading(false)
                    })
            })
            .finally(() => {
                setLoading(true)
                showCreateModal(false)
                form.resetFields()
            })
    }

    const breadCrumbData = [
        {
            key: 'main',
            url: '/',
            title: 'Главная'
        },
        {
            key: 'order',
            url: '/employee/order',
            title: 'Перевозки',
        },
        {
            key: '/order/create',
            url: '/employee/order/create',
            title: 'Создание перевозки',
            active: true,
        },
    ]

    return (
        <>
            <Helmet title="Перевозки" />
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
            </div>
            <h1 style={{marginBottom: '1.5rem'}}>Создание перевозки</h1>
            {Ramda.isEmpty(users) ?
                <div className="loading-main">
                    <Spin size="large"/>
                </div> : <EditForm users={users} form={form} onFinish={onFinish}/>}
        </>
    )
}

const putActionToProps = {
    showCreateModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Create)