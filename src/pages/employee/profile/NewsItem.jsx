import React from 'react'
import {Card} from 'antd'
import Layout from '../../../layouts/admin/Index'
import { Col, Row } from 'antd/lib'
const {Meta} = Card
const data = [
    {
        id: 1,
        img: '/images/alina.png',
        title: 'Europe Street beat',
        description: 'www.instagram.com'
    },
]
export default () => {
    return (
        <Layout>
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
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Layout>
    )
}