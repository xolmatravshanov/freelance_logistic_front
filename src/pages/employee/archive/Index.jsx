import React, {useEffect, useState} from 'react'
import Dyna from '../../../api/dyna'
import * as Ramda from 'ramda'
import {emptyText} from '../../../utils/main'
import BreadCrumb from "../../../components/app/BreadCrumb";
import classes from '../../../components/app/Layout.module.css'
import Table from '../../../components/Table/Index'
import {Helmet} from "react-helmet";
import {setData, setLoading, setPagination} from "../../../store/dyna/actions";
import {connect} from "react-redux";
import {Button, Col, Form, Row, Select} from "antd";
import Input from "antd/es/input";
import DynaApi from "../../../api/dyna";
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
        Dyna.getDatas('order/archive')
            .then(({data}) => {
                setData(data.content);
                setLoading(false)
                setPagination({
                    current: data['page'],
                    pageSize: data['pageSize'],
                    total: data['totalCount'],
                })
            })

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
                const result = Ramda.find(Ramda.propEq('key', value))(status)
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

    const breadCrumbData = [
        {
            key: 'main',
            url: '/',
            title: 'Главная'
        },
        {
            key: 'sms-temp',
            url: '/employee/archive',
            title: 'Архив',
            active: true,
        },
    ]

    const [form] = Form.useForm()

    const [formValues, setFormValues] = useState({})

    const onFinish = fieldsValue => {

        setLoading(true)

        DynaApi.getDatas('order/archive', null, fieldsValue)
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

    const status = [
        {
            key: 12,
            value: 'Прибытие на станцию',
        },
    ]

    return (
        <>
            <Helmet title="Архив" />
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
                        <Button type='primary' htmlType='submit' style={{marginLeft: '5px'}}>
                            Найти...
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table
                dataSource={data}
                isClick={false}
                columns={columns}
                labels={labels}
                url='order/archive'
                tableName='Архив'
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
