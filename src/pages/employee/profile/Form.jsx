import React from 'react'
import {Button, Card, Col, Form, Input, Row, Select} from 'antd'
import {connect} from 'react-redux'
import Ramda from 'ramda'
import FileInput from "../../../components/app/FileInput";
import Auth from "../../../api/auth";
import {errorNotify, successNotify} from "../../../utils/main";
import Upload from "../../../api/upload";


const {Option} = Select

const FormUser = props => {

    const {labels, countries, userData} = props

    const [form] = Form.useForm()

    const onFinish = fieldsValue => {
        Auth.updateUser('user', fieldsValue)
            .then((response) => {
                if (response)
                    successNotify('Данные профиля успешно изменены!')
            })
            .catch(() => errorNotify('Не удалось изменить данные профиля!'))
    }

    form.setFieldsValue(userData)

    return (

        <Card style={{height: '100%'}}>

            <Form form={form} layout='vertical' onFinish={onFinish}>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button htmlType='submit' type="primary" ghost>
                        Сохранить изменения
                    </Button>
                </div>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            rules={[
                                {required: true, message: 'Заполните Имя'}
                            ]}
                            label={labels.name}
                            name='name'
                        >
                            <Input autoComplete='off' placeholder="Введите Имя..."/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={labels.name}
                            name='username'
                            rules={[
                                {required: true, message: 'Заполните Логин!'},
                                {min: 3, message: 'Значение должно содержать более 3 символов!'}
                            ]}
                        >
                            <Input placeholder="Введите Логин..."/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>

                    <Col span={12}>
                        <Form.Item
                            label={labels.password}
                            name='password'
                            rules={[
                                {required: true, message: 'Заполните Пароль!'},
                                {min: 6, message: 'Значение должно содержать более 6 символов!'}
                            ]}
                        >
                            <Input.Password placeholder="Введите пароль..." autoComplete="true"/>
                        </Form.Item>
                    </Col>


                    <Col span={12}>
                        <Form.Item
                            label={labels.phone}
                            name='phone'
                            rules={[
                                {required: true, message: 'Заполните Телефон!'},
                            ]}
                        >
                            <Input placeholder="Введите Телефон..." autoComplete='off'/>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label={labels.email}
                            name='email'
                            rules={[
                                {required: true, message: 'Заполните E-mail!'},
                                {type: 'email', message: 'Введите правильный E-mail!'}
                            ]}
                        >
                            <Input placeholder="Введите E-mail..."/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={labels.country_id}
                            name='country_id'
                        >
                            <Select>
                                {
                                    countries.map(item => (
                                        <Option key={item.key} value={item.key}>{item.value}</Option>
                                    ))
                                }
                            </Select>

                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label={labels.image}
                            name='image'>

                             <FileInput
                                data={userData}
                                /*request={}*/
                            />

                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Card>

    )
}

const states = state => ({})

const actions = {}

export default connect(states, actions)(FormUser)