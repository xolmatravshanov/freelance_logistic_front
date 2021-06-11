import React from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'antd'

import CardUser from './Card'
import FormUser from './Form'

const labels = {
    id: 'ID',
    name: 'Имя клиента',
    phone: 'Телефон',
    email: 'E-mail',
    password: 'Пароль',
    image: 'Фотография клиента',
    country_id: 'Старны',
    created_at: 'Время создания',
}

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

const Profile = props => {

    const {userData} = props

    return (
        <div>

            <h1>Данные вашего профиля</h1>

            <Row justify='space-around'>

                <Col span={6}>
                    <CardUser userData={userData}/>
                </Col>

                <Col span={18} style={{paddingLeft: '1rem'}}>
                    <FormUser userData={userData} labels={labels} countries={countries}/>
                </Col>

            </Row>

        </div>
    )
}

const states = state => ({
    userData: state.main.userData
})

const actions = {}

export default connect(states, actions)(Profile)