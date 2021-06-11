import React, {useState} from 'react'
import {Button, Col, Form, Input, Row, Select} from 'antd'
import {statuses} from "../../../consts/consts";

const {Option} = Select

export default props => {

    const {
        onFinish,
        form,
        users,
        fields,
        id,
    } = props

    const labels = {
        number_work: 'Номер Работы',
        user_id: 'Клиент',
        container: 'Номер контейнера',
        place: 'Место',
        distance: 'Дистанция',
        status: 'Статус',
        created_at: 'Время создания',
        updated_at: 'Время изменения',
    }

    const [content, setContent] = useState(false)

    const Forms = <Row gutter={24}>
        <Col span={4}>
            <Form.Item
                rules={[

                    {required: true, message: 'Заполните номер работы!'},

                ]}
                label={labels.number_work}
                name='number_work'
            >
                <Input autoComplete='off' placeholder="Введите номер работы..."/>
            </Form.Item>
        </Col>
        <Col span={4}>
            <Form.Item
                label={labels.user_id}
                name='user_id'
                rules={[
                    {required: true, message: 'заполните это поле'},
                ]}
            >
                <Select placeholder="Выберите клиента">
                    {
                        users.map(item => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
        </Col>
        <Col span={4}>
            <Form.Item
                label={labels.container}
                name='container'
                rules={[
                    {required: true, message: 'заполните это поле!'},
                ]}
            >
                <Input placeholder="Введите номер контейнера..."/>
            </Form.Item>
        </Col>
        <Col span={4}>
            <Form.Item
                label={labels.place}
                name='place'
                rules={[
                    {max: 255, message: 'Максимальное колличество символов не может превысить 255'}
                ]}
            >
                <Input placeholder="Введите место..."/>
            </Form.Item>
        </Col>
        <Col span={4}>
            <Form.Item
                label={labels.distance}
                name='distance'
                rules={[
                    {max: 255, message: 'Максимальное колличество символов не может превысить 255'}
                ]}
            >
                <Input placeholder="Введите дистанцию..." type='number' min={0} autoComplete='off'/>
            </Form.Item>
        </Col>
        <Col span={4}>
            <Form.Item
                label={labels.status}
                name='status'
            >
                <Select placeholder="Введите статус">
                    {
                        statuses.map(item => (
                            <Option key={item.key} value={item.key}>{item.value}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
        </Col>
    </Row>

    return (

        props.type === 'edit' ? <div className='edit-wrapper'>

           <div style={{display: 'flex', justifyContent:'center'}}>
               <Button type='primary' onClick={() => {
                   setContent(true)

               }} style={
                   content ? {display: 'none'} : {}
               }>Редактировать перевозку №{id}</Button>
           </div>

            {content ?
                <>
                    <h1>Редактировать перевозку №{id}</h1>
                    <Form form={form} layout='vertical' onFinish={onFinish}>

                        {Forms}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Button style={{marginRight: '5px'}} type='primary' htmlType='button' danger onClick={() => {
                                setContent(false)
                                form.setFieldsValue(fields)
                            }}>
                                Отменить
                            </Button>
                            <Button type='primary' htmlType='submit'>
                                Изменить
                            </Button>
                        </div>

                    </Form>
                </>
                : ''}

        </div> : <div className='edit-wrapper'>

            <Form form={form} layout='vertical' onFinish={onFinish}>

                {Forms}

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>

                    <Button type='primary' htmlType='submit'>
                        Добавить
                    </Button>
                </div>

            </Form>

        </div>
    )
}