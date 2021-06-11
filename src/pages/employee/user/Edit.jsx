import React, {useEffect, useState} from 'react'
import {Form} from 'antd/lib'

import {connect} from 'react-redux'
import DynaApi from '../../../api/dyna'
import {setData, setLoading, showModal} from '../../../store/dyna/actions'
import EditForm from './Form'
import classes from "../../../components/app/Layout.module.css";
import BreadCrumb from "../../../components/app/BreadCrumb";
import {Spin} from "antd";
import * as Ramda from "ramda"

const Edit = props => {

    let id = props.match.params.id;

    const [form] = Form.useForm()

    const {
        showModal,
        setLoading,
        setData,
    } = props

    const onFinish = (fieldsValue) => {

        DynaApi.updateRow('user', fieldsValue, id)
            .then(() => {
                setLoading(true)
                DynaApi.getData('user')
                    .then(({data}) => {
                        setData(data.content)
                        setLoading(false)
                    })
            })

    }

    const [fields, setFields] = useState({})

    useEffect(() => {
        DynaApi.getRow('user/one', id).then(({data}) => {
            setFields(data)
        })
    }, [form])

    form.setFieldsValue(fields)

    const breadCrumbData = [
        {
            key: 'main',
            url: '/',
            title: 'Главная'
        },
        {
            key: 'users',
            url: '/employee/user',
            title: 'Клиенты',
        },
        {
            key: '/order/create',
            title: 'Редактирование клиента',
            active: true,
        },
    ]

    return (
        <>
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
            </div>
            <h1 style={{marginBottom: '1.5rem'}}>Редактирование клиента №{id}</h1>
            {Ramda.isEmpty(fields) ?
                <div className="loading-main">
                    <Spin size="large"/>
                </div> :
                <EditForm form={form} onFinish={onFinish} type='edit'/>}
        </>
    )
}

const putActionToProps = {
    showModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Edit)