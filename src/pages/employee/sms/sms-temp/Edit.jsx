import React, {useEffect} from 'react'
import {Form} from 'antd/lib'
import {connect} from 'react-redux'
import EditForm from './Form'
import DynaApi from "../../../../api/dyna";
import {setData, setLoading, showModal} from "../../../../store/dyna/actions";
import Coube from "../../../../components/app/coube";
import {Helmet} from "react-helmet";

const Edit = props => {

    let id = props.match.params.id;

    const [form] = Form.useForm()

    const {
        showModal,
        setLoading,
        setData,
    } = props

    const onFinish = (fieldsValue) => {

        DynaApi.updateRow('sms-temp', fieldsValue, id)
            .then(() => {
                DynaApi.getData('sms-temp')
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

    const getSmsTemp = () => {
        DynaApi.getRow('sms-temp/one', id).then(({data}) => {
            form.setFieldsValue(data)
        });
    }

    useEffect(() => {
        getSmsTemp();
    }, [form])

    return (
        <>
            <Helmet title="Тип сообщений" />
            <h1>Изменить тип сообщения №{id}</h1>
            <EditForm form={form} onFinish={onFinish} type='edit'/>
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
    showModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Edit)