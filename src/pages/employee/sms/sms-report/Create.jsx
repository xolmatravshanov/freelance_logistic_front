import React, {useEffect} from 'react'
import {Form} from "antd/lib"
import {connect} from 'react-redux'
import {setData, setLoading, showCreateModal} from '../../../../store/dyna/actions'
import EditForm from './Form'
import DynaApi from '../../../../api/dyna'
import {Helmet} from "react-helmet";

const Create = props => {

    const {
        showCreateModal,
        setLoading,
        setData,
    } = props

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(props.record)
    }, [form, props.record])

    const onFinish = fieldsValue => {

        DynaApi.create('sms', fieldsValue)
            .then(() => {
                DynaApi.getData('sms')
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

    return (
        <>
            <Helmet title="Отчёт по отправленным сообщениям" />
            <h1>Добавить перевозку</h1>
            <EditForm form={form} onFinish={onFinish}/>
        </>
    )
}

const putActionToProps = {
    showCreateModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Create)