import React from 'react'
import {Button, Col, Form, Input, Row, Select} from 'antd'

const {Option} = Select

const Forms = props => {

    const {
        onFinish,
        form,
    } = props

    const labels = {
        id: 'ID',
        type: 'Тип',
        name: 'Название',
        title: 'Заголовок',
        message: 'Сообщение',
    }

    const type = [
        {
            key: 'email',
            value: 'email',
        },
        {
            key: 'sms',
            value: 'sms',
        }
    ]

    return (
        <div className='edit-wrapper'>

            <Form form={form} layout='vertical' onFinish={onFinish}>

                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            rules={[
                                {required: true, message: 'Необходимо заполнить имя'},
                                {max: 255, message: 'Максимальное колличество символов не может превысить 255'}
                            ]}
                            label={labels.name}
                            name='name'
                        >
                            <Input autoComplete='off' placeholder="Введите имя..."/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            rules={[
                                {required: true, message: 'Необходимо заполнить заголовок'},
                                {max: 255, message: 'Максимальное колличество символов не может превысить 255'}
                            ]}
                            label={labels.title}
                            name='title'
                        >
                            <Input autoComplete='off' placeholder="Введите Заголовок..."/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={labels.type}
                            name='type'
                            rules={[
                                {required: true, message: 'Необходимо выбрать тип'},
                            ]}
                        >
                            <Select placeholder="Выберите тип">
                                {
                                    type.map(item => (
                                        <Option key={item.key} value={item.key}>{item.value}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item
                            label={labels.message}
                            name='message'
                            rules={[
                                {required: true, message: 'Необходимо заполнить сообщение'},
                            ]}
                        >
                            <Input.TextArea rows={8} allowClear autoComplete='off' placeholder="Введите сообщение..."/>
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