import React, {useEffect, useState} from 'react'
import Edit from './Edit'
import Create from './Create'
import View from './View'
import BreadCrumb from '../../../components/app/BreadCrumb'
import classes from '../../../components/app/Layout.module.css'
import Dyna from '../../../api/dyna'
import DynaGrid from '../../../components/DynaGrid/Index'
import * as Ramda from 'ramda'
import {emptyText} from '../../../utils/main'
import {statuses} from '../../../consts/consts'
import {Button, Col, Form, Row, Select} from "antd";
import Input from "antd/es/input";
import DynaApi from "../../../api/dyna";
import {setData, setLoading, setPagination} from "../../../store/dyna/actions";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
const {Option} = Select

const Index = props => {

    const {data, setData, loading, setLoading, setPagination} = props

    const labels = {
        id: 'ID',
        number_work: 'Номер Работы',
        user_id: 'Клиенты',
        container: 'Номер контейнера',
        place: 'Место',
        distance: 'Дистанция',
        status: 'Статус',
        created_at: 'Время создания',
        updated_at: 'Время изменения',
    }

    const [users, setUsers] = useState([])

    useEffect(() => {

        Dyna.getAllData('user')
            .then(response => {
                setUsers(response.data)
            })

    }, [])

    const columns = [
        {
            title: labels['number_work'],
            dataIndex: 'number_work',
            sorter: true,
            align: 'center',
            width: '130px'
        },
        {
            title: labels['user_id'],
            dataIndex: 'user_id',
            sorter: true,
            align: 'center',
            ellipsis: true,
            width: '100px',
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
            width: '200px'
        },
        {
            title: labels['distance'],
            dataIndex: 'distance',
            sorter: true,
            ellipsis: true,
            align: 'center',
            width: '130px'
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

    const [formValues, setFormValues] = useState({})

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
            active: true,
        },
    ]

    const [form] = Form.useForm()

    const onFinish = fieldsValue => {

        setLoading(true)

        DynaApi.getData('order', null, fieldsValue)
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
            <Helmet title="Перевозки" />
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
            </div>
                <Form form={form} layout='vertical' onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item
                                name='date_to'
                            >
                                <Input type='datetime-local' allowClear/>

                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name='date_from'
                            >
                                <Input type='datetime-local' allowClear/>

                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name='Order[user_id]'
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
                            <Form.Item
                                name='Order[container]'
                            >
                                <Input placeholder="Поиск по контейнеру" allowClear/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name='Order[status]'
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
                        <Col span={4}>
                            <Button type='primary' htmlType='submit' style={{marginLeft: '5px'}}>
                                Найти...
                            </Button>
                        </Col>
                    </Row>
                </Form>
            <DynaGrid
                columns={columns}
                labels={labels}
                url='order'
                tableName='Перевозки'
                createTitle='Добавить перевозку'
                viewTitle='Данные перевозки №{id}'
                updateTitle='Редактировать данные перевозки №{id}'
                editContent={(record) => <Edit record={record}/>}
                createContent={(record) => <Create record={record}/>}
                viewContent={(record, labels) => <View record={record} labels={labels}/>}
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
