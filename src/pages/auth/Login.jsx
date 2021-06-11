import React from 'react'
import {Button, Checkbox, Col, Form, Input, Row} from 'antd'

import classes from "./login.module.css"
import Auth from '../../api/auth'
import {errorNotify} from '../../utils/main'

export default props => {
   
    const labels = {
        id: "ID",
        name: "Имя клиента",
        phone: "Телефон",
        email: "E-mail",
        password: "Пароль",
        created_at: "Время создания",
    }
   
    const [form] = Form.useForm()

    const onFinish = (fieldsValue) => {

        Auth.login(fieldsValue)
            .then(response => {

                const {data} = response
                const role = data.role

                localStorage.setItem('token', data.auth_key)
                if (role)
                    window.location = `/${role}`

            })
            .catch(() => errorNotify('Неправильный Логин или Пароль!'))
    }

    return (
        <div className={classes.loginWrapper}>
            <div className={classes.loginParent}>
                <div className={classes.loginForm}>
                    <div className={classes.logos}>
                        <img src="/images/NTL.png" alt=""/>
                    </div>
                    <Form layout="vertical" onFinish={onFinish} form={form}>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    label={labels.email}
                                    name="email"
                                    className={classes.loginFormItem}
                                    rules={[
                                        {required: true, message: "Необходимо, заполнить Логин!"},
                                    ]}
                                >
                                    <Input placeholder="Введите логин..."/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    label={labels.password}
                                    name="password"
                                    className={classes.loginFormItem}
                                    rules={[
                                        {required: true, message: "Необходимо, заполнить Пароль!"},
                                        {
                                            min: 6,
                                            message: "Значение должно содержать не менее 6 символов!",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Введите пароль..."/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <div>
                            <Checkbox
                                valuePropName="checked"
                                className={classes.loginFormCheckbox}
                            >
                                Запомнить меня
                            </Checkbox>
                        </div>

                        <div className={classes.loginFormBtnParent}>
                            <Button
                                type="default"
                                className={classes.loginFormButton}
                                htmlType="submit"
                            >
                                Войти
                            </Button>
                        </div>

                        <br/>

                    </Form>
                </div>
            </div>
        </div>
    )

}
