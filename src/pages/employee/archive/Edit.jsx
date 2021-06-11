import React, {useEffect} from 'react'
import {Form} from 'antd/lib'
import {connect} from 'react-redux'
import DynaApi from '../../../api/dyna'
import {setData, setLoading, showModal} from '../../../store/dyna/actions'
import EditForm from './Form'
import {Helmet} from "react-helmet";

const Edit = props => {

    const [form] = Form.useForm()

    const {
        showModal,
        setLoading,
        setData,
    } = props

    const onFinish = (fieldsValue) => {
        DynaApi.updateRow('sms', fieldsValue, props.record.id)
            .then(() => {
                DynaApi.getData('sms')
                    .then(({data}) => {
                        setData(data.content)
                        setLoading(false)
                    })
            })
            .finally(() => {
                setLoading(true)
                showModal(false)
            })

    }

    useEffect(() => {
        form.setFieldsValue(props.record)
    }, [form, props.record])

    return <>
        <Helmet title="Смс отправка" />
        <EditForm form={form} onFinish={onFinish} type='edit'/>
        </>
}

const putActionToProps = {
    showModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Edit)