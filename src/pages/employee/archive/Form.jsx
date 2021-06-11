import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Input, Select, Row} from 'antd'
import DynaApi from '../../../api/dyna'
import {errorNotify} from '../../../utils/main'
import RadioGroup from '../../../components/app/RadioGroup'
import {statuses} from "../../../consts/consts";

const {Option} = Select

const Forms = props => {

    const {
        onFinish,
        form,
    } = props

    const labels = {
        id: 'ID',
        user_id: 'Клиенты',
        status: 'Статус',
        message: 'Сообщения',
        error: 'Ошибка?',
        created_at: 'Время создания',
        updated_at: 'Время изменения',
    }

    const ErrorData = [
        {
            value: 1,
            label: 'Да',
        },
        {
            value: 0,
            label: 'Нет',
        },
    ]

    const [users, setUsers] = useState([])

    useEffect(() => {
        DynaApi.getAllData('user')
            .then(({data}) => {
                setUsers(data)
            })
            .catch(() => errorNotify('Ошибка при выводе клиентов из базы данных'))

    }, [])

    return (
        <div className='edit-wrapper'>

            <Form form={form} layout='vertical' onFinish={onFinish}>

                <Row gutter={20}>

                    <Col span={12}>
                        <Form.Item
                            label={labels.user_id}
                            name='user_id'
                            rules={[
                                {required: true, message: 'Заполните это поле'},
                            ]}
                        >
                            <Select placeholder="Выберите клиента">
                                {
                                    users.map(item => (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={labels.status}
                            name='status'
                        >
                            <Select placeholder="Введите статус">
                                {
                                    statuses.map(item => (
                                        <Option key={item.key} value={item.key}>{item.value}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={20}>

                    <Col span={12}>
                        <Form.Item
                            label={labels.message}
                            name='message'
                        >
                            <Input placeholder="Введите номер контейнера..."/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={labels.error}
                            name='error'
                        >
                            <RadioGroup data={ErrorData}/>
                        </Form.Item>
                    </Col>

                </Row>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button type='primary' htmlType='submit'>
                        {props.type === 'edit' ? 'Изменить' : 'Добавить'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default Forms