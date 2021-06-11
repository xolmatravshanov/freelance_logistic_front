import React, {useEffect, useState} from 'react'
import {Form} from "antd/lib"
import {connect} from 'react-redux'
import {setData, setLoading, showCreateModal} from '../../../store/dyna/actions'
import EditForm from './Form'
import DynaApi from '../../../api/dyna'
import classes from "../../../components/app/Layout.module.css";
import BreadCrumb from "../../../components/app/BreadCrumb";

const Edit = (props) => {

    const {
        showCreateModal,
        setLoading,
        setData,
    } = props

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({role: 'client'})
    }, [])

    const onFinish = fieldsValue => {

        DynaApi.create('user', fieldsValue)
            .then(() => {
                setLoading(true)
                DynaApi.getData('user')
                    .then(({data}) => {
                        setData(data.content)
                        setLoading(false)
                    })
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
            url: '/employee/user',
            title: 'Клиенты',
        },
        {
            key: '/order/create',
            url: '/employee/user/create',
            title: 'Создание клиента',
            active: true,
        },
    ]

    return (
        <>
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
            </div>
            <h1 style={{marginBottom: '1.5rem'}}>Создание клиента</h1>
            <EditForm form={form} onFinish={onFinish}/>
        </>
    )

}

const putActionToProps = {
    showCreateModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Edit)