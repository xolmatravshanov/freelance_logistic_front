import React, {useEffect} from 'react'
import {Form} from "antd/lib"
import {connect} from 'react-redux'
import {setData, setLoading, showCreateModal} from '../../../../store/dyna/actions'
import EditForm from './Form'
import DynaApi from "../../../../api/dyna";
import Coube from "../../../../components/app/coube";
import {Helmet} from "react-helmet";

const Create = props => {

    const {
        showCreateModal,
        setLoading,
        setData,
    } = props

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            ...props.record,
            type: 'email'
        })
    }, [form, props.record])

    const onFinish = fieldsValue => {

        DynaApi.create('sms-temp', fieldsValue)
            .then(() => {
                DynaApi.getData('sms-temp')
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
            <Helmet title="Тип сообщений" />
            <h1>Добавить тип сообщения</h1>
            <EditForm form={form} onFinish={onFinish} />
            <h2 style={{fontSize: '20px', fontWeight: 'Bold'}}>Описание шифр</h2>
            <h6 style={{marginRight: '20px', fontSize: '20px', fontWeight: 'Bold', display: 'flex'}}>
                <Coube/>
                &nbsp; &number - номер
            </h6>
            <h6 style={{marginRight: '20px', fontSize: '20px', fontWeight: 'Bold', display: 'flex'}}>
                <Coube/>
                &nbsp; &name - имя клиента
            </h6>
        </>
    )
}

const putActionToProps = {
    showCreateModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Create)