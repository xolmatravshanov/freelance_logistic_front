import React from 'react'
import {Card} from 'antd'
import { Col, Row } from 'antd/lib'
import {NavLink} from "react-router-dom";
const {Meta} = Card
const data = [
    {
        id: 1,
        img: '/images/alina.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
    {
        id: 2,
        img: '/images/alina.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
    {
        id: 3,
        img: '/images/alina.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
    {
        id: 4,
        img: '/images/alina.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
    {
        id: 5,
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
    {
        id: 6,
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
    {
        id: 7,
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
    {
        id: 8,
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },


]
export default () => {
    return (
            <Row gutter={20} style={{ justifyContent:'center' }}>
                {
                    data.map((item, key) => {
                        return (
                            <Col className="gutter-row" span={5}>
                                <Card
                                    hoverable
                                    style={{ marginBottom: 20 }}
                                    cover={<img alt="example" src={item.img}/>}
                                >
                                    <Meta title={item.title} description={item.description}/>
                                    <NavLink to="/users/newsitem">Подробно...</NavLink>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
    )
}