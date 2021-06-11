import React, {useEffect, useState} from 'react'
import {Form} from 'antd/lib'
import {connect} from 'react-redux'
import DynaApi from '../../../api/dyna'
import {setData, setLoading, showModal} from '../../../store/dyna/actions'
import EditForm from './Form'
import classes from '../../../components/app/Layout.module.css'
import BreadCrumb from '../../../components/app/BreadCrumb'
import {Col, Row, Select, Spin} from 'antd'
import OrderHistory from '../order_history/Index'
import * as Ramda from 'ramda'
import {errorNotify} from "../../../utils/main";
import Input from "antd/es/input";
import {statuses} from "../../../consts/consts";
import {Helmet} from "react-helmet";

const {Option} = Select

const Edit = props => {

    let id = props.match.params.id;

    const [form] = Form.useForm()

    const {
        showModal,
        setLoading,
        setData,
    } = props

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
            title: 'Редактирование перевозки',
            active: true,
        },
    ]

    const onFinish = (fieldsValue) => {

        DynaApi.updateRow('order', fieldsValue, id)
            .then(() => {
                DynaApi.getData('order-history', null, {
                    id: id
                })
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

    const [users, setUsers] = useState([])

    const [fields, setFields] = useState({})

    useEffect(() => {

        DynaApi.getAllData('user')
            .then(({data}) => {
                setUsers(data)
                DynaApi.getRow('order/one', id).then(({data}) => {
                    setFields(data)
                })

            })
            .catch(() => errorNotify('Ошибка при выводе клиента из базы данных'))

    }, [form])

    form.setFieldsValue(fields)

    const color = {
        color: '#1198ba',
        pointerEvents:'none',
    }

    const status = Ramda.find(Ramda.propEq('key', fields.status))(statuses)

    const oneUser = Ramda.find(Ramda.propEq('id', fields.user_id))(users)

    return (
        <>
            <Helmet title="Перевозки" />
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
            </div>
            <h1 style={{marginBottom: '1.5rem'}}>Перевозка №{id}</h1>
            {Ramda.isEmpty(fields) ?
                <div className="loading-main">
                    <Spin size="large"/>
                </div> :
                <>
                    <Row gutter={24}>
                        <Col span={4}>
                            <label>
                                <span>Номер Работы</span>
                                <Input style={color} type="text" value={fields.number_work} />
                            </label>
                        </Col>
                        <Col span={4}>
                            <label>
                                <span>Клиент</span>
                                <Input style={color} type="text" value={oneUser.name} />
                            </label>
                        </Col>
                        <Col span={4}>
                            <label>
                                <span>Номер контейнера</span>
                                <Input style={color} value={fields.container}/>
                            </label>
                        </Col>
                        <Col span={4}>
                            <label>
                                <span>Место</span>
                                <Input style={color} type="text" value={fields.place} />
                            </label>
                        </Col>
                        <Col span={4}>
                            <label>
                                <span>Дистанция</span>
                                <Input style={color} type="text" value={fields.distance} />
                            </label>
                        </Col>
                        <Col span={4}>
                            <label>
                                <span>Статус</span>
                                <Input style={color} type="text" value={status.value} />
                            </label>
                        </Col>

                    </Row>
                    <br/>
                    <EditForm fields={fields} users={users} form={form} onFinish={onFinish} type='edit' id={id}/>
                    <OrderHistory id={id}/>
                </>
            }
        </>
    )
}

const putActionToProps = {
    showModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Edit)