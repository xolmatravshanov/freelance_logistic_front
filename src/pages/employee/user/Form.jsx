import React from 'react'

import {Button, Col, Form, Input, Row, Select} from 'antd/lib'

const Index = props => {

    const {
        onFinish,
        form
    } = props

    const labels = {
        id: 'ID',
        password_hash: 'Пароль',
        name: 'Имя клиента',
        phone: "Телефон номер клиента",
        email: 'E-mail',
        created_at: 'Время создания',
        roles: 'Роль клиента'
    }

    return (
        <div className='edit-wrapper'>

            <Form form={form} layout="vertical" onFinish={onFinish}>

                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            label={labels.name}
                            name='name'
                        >
                            <Input placeholder="Введите имя клиента..."/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label={labels.phone}
                            name='phone'
                        >
                            <Input type="number" min={0} placeholder="Введите номер клиента..." maxLength={12}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label={labels.email}
                            name='email'
                            rules={[
                                {required: true, message: 'Заполните E-mail!'},
                                {type: 'email', message: 'Введите правильный E-mail!'}
                            ]}
                        >
                            <Input placeholder="Введите E-mail......" autoComplete='off'/>
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

export default Index