import React, {useEffect, useState} from 'react'
import Edit from './Edit'
import Create from './Create'
import View from './View'
import {Button, Col, Form, Row, Select} from "antd";
import Input from "antd/es/input";
import {connect} from "react-redux";
import DynaApi from "../../../../api/dyna";
import Dyna from "../../../../api/dyna";
import BreadCrumb from "../../../../components/app/BreadCrumb";
import classes from '../../../../components/app/Layout.module.css'
import {setData, setLoading, setPagination} from "../../../../store/dyna/actions"
import DynaGrid from '../../../../components/DynaGrid/Index'
import * as Ramda from 'ramda'
import {statuses} from '../../../../consts/consts'
import {emptyText} from '../../../../utils/main'
import {Helmet} from "react-helmet";

const {Option} = Select

const Index = props => {

    const {data, setData, loading, setLoading, setPagination} = props
    const [users, setUsers] = useState([])

    const breadCrumbData = [
        {
            key: 'order',
            url: '/employee/order',
            title: 'Перевозки'
        },
        {
            key: 'sms-report',
            url: '/employee/sms-report',
            title: 'Все сообщения',
            active: true,
        },
    ]

    const labels = {
        id: 'ID',
        user_id: 'Клиенты',
        status: 'Статус',
        message: 'Сообщения',
        error: 'Ошибка',
        created_at: 'Время создания',
        updated_at: 'Время изменения',
    }

    const error = [
        {
            key: 0,
            value: 'Без ошибки',
        },
        {
            key: 1,
            value: 'С ошибкой',
        }

    ]

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
            title: labels['message'],
            dataIndex: 'message',
            sorter: true,
            align: 'center',
            width: '130px'
        },

        {
            title: labels['error'],
            dataIndex: 'error',
            sorter: true,
            align: 'center',
            width: '130px',
            render: value => {
                const result = Ramda.find(Ramda.propEq('key', value))(error)
                if (result) {
                    return result.value
                }
            }
        },
        {
            title: labels['created_at'],
            dataIndex: 'created_at',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '200px'
        },
        {
            title: labels['updated_at'],
            dataIndex: 'updated_at',
            sorter: true,
            align: 'center',
            width: '200px'
        },
    ]

    useEffect(() => {

        Dyna.getAllData('user')
            .then(response => {
                setUsers(response.data)
            })

    }, [])

    const [formValues, setFormValues] = useState({})

    const [form] = Form.useForm()

    const onFinish = fieldsValue => {

        setLoading(true)

        DynaApi.getData('sms', null, fieldsValue)
            .then((response) => {
                if (response.data) {
                    const {data} = response
                    setData(response.data.content)
                    setLoading(false)
                    setPagination({
                        current: data['page'],
                        pageSize: data['pageSize'],
                        total: data['totalCount'],
                    })
                }
            })

    }

    useEffect(() => {
        setLoading(false)
        form.setFieldsValue(formValues)
    }, [])

    return (
        <>
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
            </div>
            <Helmet title="Отчёт по отправленным сообщениям" />
            <div style={{display: 'flex'}}>
                <Form form={form} layout='vertical' onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item
                                name='date_to'
                            >
                                <Input type='datetime-local' allowClear/>

                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name='date_from'
                            >
                                <Input type='datetime-local' allowClear/>

                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name='Sms[status]'
                            >
                                <Select placeholder="Поиск по статусу" allowClear>
                                    {
                                        statuses.map(item => (
                                            <Option key={item.key} value={item.key}>{item.value}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name='Sms[user_id]'
                            >
                                <Select placeholder="Поиск по клиенту" allowClear>
                                    {
                                        users.map(item => (
                                            <Option key={item.id} value={item.id}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Button type='primary' htmlType='submit' style={{marginLeft: '5px'}}>
                                Искать...
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <DynaGrid
                columns={columns}
                labels={labels}
                url='sms'
                isClick={false}
                tableName='Отчёт по отправленным сообщениям'
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
