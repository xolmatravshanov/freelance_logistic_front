import React from 'react'
import {Table} from "antd";

const View = ({record}) => {
    const data = []
    const records = Object.keys(record);

    if (!(records === '' && records === null)) {

        records.map((attribute) => {
            return data.push({
                attribute: attribute,
                value: record[attribute]
            })
        })
    } else {
        return;
    }


    const columns = [
        {
            title: 'Атрибут',
            dataIndex: 'attribute',
            render: (attribute) => (
                <strong>{attribute}</strong>
            )
        },
        {
            title: 'Значение',
            dataIndex: 'value'
        }
    ];

    return (
        <div className='view'>

            <Table
                bordered
                isClick={false}
                size='middle'
                columns={columns}
                rowKey={row => row.attribute}
                pagination={false}
                dataSource={data}
            />

        </div>
    )
}

export default View