import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'antd'
const {Meta} = Card

const CardUser = props => {

    const {userData} = props

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

    return (
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
                         src={userData.image}
                    />
                </div>
            }
        >
            <Meta
                style={{
                    textAlign: 'center',
                    fontWeight: 'BOLD'
                }}
                title={userData.name}
                description={userData.role}

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
    )
}

const states = state => ({})

const actions = {}

export default connect(states, actions)(CardUser)