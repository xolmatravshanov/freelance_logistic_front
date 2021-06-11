import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Input, Row, Select} from 'antd'
import Auth from '../../../api/auth'
import FileInput from "../../../components/app/FileInput";
import {errorNotify, successNotify} from "../../../utils/main";

const {Meta} = Card
const {Option} = Select

const Index = () => {

    const [form] = Form.useForm()

    const token = localStorage.getItem('token')
    const action = process.env.REACT_APP_PRODUCTION_PATH ? process.env.REACT_APP_PRODUCTION_PATH :"http://localhost/ntl/web";
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)

    const labels = {
        id: 'ID',
        name: 'Имя клиента',
        username: 'Логин',
        phone: 'Телефон',
        email: 'E-mail',
        password: 'Пароль',
        image: 'Фотография клиента',
        country_id: 'Старны',
        created_at: 'Время создания',
    }

    const onFinish = fieldsValue => {

        Auth.updateUser('user', fieldsValue)
            .then((response) => {
                if (response)
                    successNotify('Данные профиля успешно изменены!')
            })
            .catch(() => errorNotify('Не удалось изменить данные профиля!'))

    }

    useEffect(() => {

        Auth.getUser(token)
            .then(response => {
                setUserData(response.data)
                setLoading(false)
            })

    }, [])


    form.setFieldsValue(userData)

    const about = [
        {
            id: 1,
            title: 'Ваша активность',
            count: '34',
            color: '#fcba03'
        },
        {
            id: 2,
            title: 'Ваши сделки',
            count: '28',
            color: '#008c8c'
        },
        {
            id: 3,
            title: 'Ваши потери',
            count: '14',
            color: '#FF2400'
        },
    ]

    const countries = [
        {
            key: 1,
            value: 'Узбекистан',
        },
        {
            key: 2,
            value: 'Россия',
        },
        {
            key: 3,
            value: 'США',
        },
    ]

    return loading ? null : (
        <Row>


            <Col span={4} style={{borderRadius: '35%'}}>
                <Card
                    style={{height: '100%'}}
                    hoverable
                    cover={
                        <div
                            style={
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '5px 0px'
                                }
                            }>
                            <img alt="example" style={
                                {
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                }
                            }
                                 src={userData ? userData.image : '/images/temprorary.png'}
                            />
                        </div>
                    }
                >
                    <Meta
                        style={{
                            textAlign: 'center',
                            fontWeight: 'BOLD'
                        }}
                        title={userData ? userData.name : ''}
                        description={userData ? userData.role : ''}

                    />

                    <div
                        style={
                            {
                                borderTop: '1px solid #ccc',
                                marginTop: 15,
                            }
                        }
                    />

                    {about.map((item, key) => {
                        return (
                            <div key={key}>
                                <div style={{
                                    fontWeight: '500',
                                    marginTop: 15,
                                    color: '#000000D9',
                                }}>
                                    {item.title}
                                    <div style={{
                                        color: `${item.color}`,
                                        fontWeight: 'BOLD',
                                        float: 'right'
                                    }}>{item.count}</div>
                                </div>
                                <div
                                    style={{
                                        borderBottom: '1px solid #ccc',
                                        marginTop: 15,
                                    }}
                                />
                            </div>
                        )
                    })}

                </Card>
            </Col>


            <Col span={19} offset={1} style={{borderRadius: '35%'}}>
                <Card hoverable style={{height: '80vh',}}>
                    <Form form={form} layout='vertical' onFinish={onFinish}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item
                                    rules={[
                                        {required: true, message: 'Заполните Имя!'}
                                    ]}
                                    label={labels.name}
                                    name='name'
                                >
                                    <Input autoComplete='off' placeholder="Введите Имя..."/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={labels.username}
                                    name='username'
                                    rules={[
                                        {required: true, message: 'Заполните Логин!'},
                                        {min: 3, message: 'Значение должно содержать более 3 символов!'}
                                    ]}
                                >
                                    <Input placeholder="Введите Логин..."/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
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
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
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
                            <Col span={8}>
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
                            <Col span={8}>
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
                            <Col span={8}>
                                <Form.Item
                                    label={labels.image}
                                    name='image'>

                                    <FileInput
                                        data={userData}
                                        action={action}
                                    />

                                </Form.Item>
                            </Col>
                        </Row>
                        <Button htmlType='submit' type="primary" ghost>Обновить свои данные</Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
export default Index