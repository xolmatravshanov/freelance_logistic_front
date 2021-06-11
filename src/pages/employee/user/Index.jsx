import React, {useEffect, useState} from 'react'
import DynaGrid from '../../../components/DynaGrid/Index'
import Edit from './Edit'
import Create from './Create'
import View from '../../../components/DynaGrid/View'
import BreadCrumb from '../../../components/app/BreadCrumb'
import classes from '../../../components/app/Layout.module.css'
import {Button, Col, Form, Input, InputNumber, Row, Select} from "antd";
/*import Input from "antd/es/input";*/
import {setData, setLoading, setPagination} from "../../../store/dyna/actions";
import {connect} from "react-redux";
import Dyna from "../../../api/dyna";
import DynaApi from "../../../api/dyna";
import PhoneFilled from "@ant-design/icons/lib/icons/PhoneFilled";

const {Option} = Select

const Index = props => {

    const {data, setData, loading, setLoading, setPagination} = props

    const [users, setUsers] = useState([])

    useEffect(() => {

        Dyna.getAllData('user')
            .then(response => {
                setUsers(response.data)
            })

    }, [])

    const [formValues, setFormValues] = useState({})

    const [form] = Form.useForm()

    const onFinish = fieldsValue => {
        setFormValues(fieldsValue)
        setLoading(true)

        DynaApi.getData('user', null, fieldsValue)
            .then((response) => {
                if (response.data) {
                    const {data} = response
                    setData(data.content)
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

    const labels = {
        id: 'ID',
        name: 'Имя',
        email: 'E-mail',
        password_hash: 'Пароль',
        phone: 'Телефон номер',
        created_at: 'Время создания',
        updated_at: 'Время изменения',
        modified_at: 'Создан пользователем',
    }

    const columns = [
        {
            title: labels['name'],
            dataIndex: 'name',
            sorter: true,
            align: 'center',
        },
        {
            title: labels['email'],
            dataIndex: 'email',
            sorter: true,
            align: 'center',
        },
        {
            title: labels['phone'],
            dataIndex: 'phone',
            sorter: true,
            align: 'center',
        },
        {
            title: labels['created_at'],
            dataIndex: 'created_at',
            sorter: true,
            align: 'center',
        },
        {
            title: labels['updated_at'],
            dataIndex: 'updated_at',
            sorter: true,
            align: 'center',
        },
    ]

    const breadCrumbData = [
        {
            key: 'main',
            url: '/',
            title: 'Перевозки'
        },
        {
            key: 'user',
            url: '/employee/user',
            title: 'Клиенты',
            active: true,
        },
    ]

    return (
        <>
            <div className={classes.breadCrumb}>
                <BreadCrumb data={breadCrumbData}/>
            </div>
                <Form form={form} layout='vertical' onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item
                                name='date_to'
                            >
                               {/* <DatePicker defaultValue={moment('2015-06-06', 'YYYY-MM-DD')} />*/}
                                <Input type='datetime-local'  allowClear/>

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
                                name='User[user_id]'
                            >
                                <Select placeholder="Найти клиента" allowClear>
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
                                name='User[phone]'
                            >
                                <Input type='number' suffix={<PhoneFilled />} min={0} allowClear placeholder="Поиск по номеру телефона клиента" />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Button type='primary' htmlType='submit'>
                                Найти...
                            </Button>
                        </Col>
                    </Row>

                </Form>
            <DynaGrid
                columns={columns}
                labels={labels}
                paramsData={formValues}
                url='user'
                tableName='Клиенты'
                createTitle='Добавить Клиента'
                viewTitle='Данные Клиента №{id}'
                updateTitle='Редактировать данные Клиента №{id}'
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
