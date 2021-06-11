import React, {useEffect, useState} from 'react'
import DynaApi from '../../../api/dyna'
import { Form, Select} from "antd/lib"
import {Button, Col, Row} from "antd";
import {successNotify} from "../../../utils/main";
import {setData, setLoading, showCreateModal} from "../../../store/dyna/actions";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

const {Option} = Select;

const Create = props => {

    const [users, setUsers] = useState([])
    const [smsTemps, setSmsTemps] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalSize, setTotalSize] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [form] = Form.useForm();

    useEffect(() => {
        DynaApi.getData('user').then(({data}) => {

            setUsers(data.content);
            //setTotalSize(data.totalCount)
           // setTotalPage(parseInt(data.totalCount / 50 + 1));
            setPageSize(data.pageSize)

        });

        DynaApi.getData('sms-temp').then(({data}) => {

            setSmsTemps(data.content);

        });

    }, [])

    function handleChange(value) {

    }

    function onPopupScrollHandler(event) {

        var target = event.target

        if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight) {

            setLoading(true);
            target.scrollTo(0, target.scrollHeight)

            let page1 = page;

            page1++

            setPage(page1)

            if (page <= totalPage) {

                let data = {
                    page: page,
                    "per-page": 50,
                }

                DynaApi.getData('user', data).then(({data}) => {
                    let newUsers = [...users, ...data.content];
                    setUsers(newUsers);
                });

            }
            setLoading(false);
        }
    }

    function userSearchHandler(event) {

        //  let r = users.find(user => user.name  == event);

    }

    function mapper(array) {

        let arrays = array.map(arrayItem => {
            return <Option key={arrayItem.id} value={arrayItem.id}>{arrayItem.name}</Option>
        })

        return arrays;
    }

    const onFinish = fieldsValue => {

        successNotify('электронная почта и смс начали отправку', 'электронная почта и смс')

        setTimeout(() => {
            window.history.back()
        }, 1000)
    }

    return (
        <>
            <Helmet title="Смс отправка" />
            <h1>Отправить смс</h1>
            <div>
                <Form form={form} layout='vertical' onFinish={onFinish}>
                    <Row gutter={20}>
                        <Col span={10}>
                            <Form.Item
                                name='user_ids'
                                rules={[
                                    {required: true, message: "Виберите клиента"}
                                ]}
                            >
                                <Select
                                    showSearch={true}
                                    onPopupScroll={onPopupScrollHandler}
                                    mode="multiple"
                                    allowClear
                                    onSearch={userSearchHandler}
                                    style={{width: '100%'}}
                                    placeholder="Выберите клиента"
                                    onChange={handleChange}
                                >
                                    <Option key='all' value='all' style={{backgroundColor: '#06d6a0'}}>Выбрать
                                        все</Option>
                                    {

                                        mapper(users)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={10}>
                            <Form.Item
                                name='temp_id'
                                rules={[
                                    {required: true, message: "Виберите Темплете"}
                                ]}
                            >
                                <Select

                                    showSearch={true}
                                    style={{width: '100%'}}
                                    placeholder="Пожалуйста, выберите шаблон смс"
                                    onChange={handleChange}
                                >
                                    {
                                        mapper(smsTemps)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Button type='primary' htmlType='submit'>
                                Отправить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <br/>
        </>
    )
}

const putActionToProps = {
    showCreateModal,
    setData,
    setLoading,
}

export default connect(null, putActionToProps)(Create)