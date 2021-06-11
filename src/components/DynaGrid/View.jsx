import React from 'react'
import {Table} from 'antd'
import {emptyText} from '../../utils/main'

const View = ({record, labels = []}) => {

    const data = []
    const records = Object.keys(record)

    records.map(attribute => {
        return data.push({
            attribute: labels[attribute] ?? attribute,
            value: record[attribute] ?? emptyText('(Не задано)')
        })
    })

    const columns = [
        {
            dataIndex: 'attribute',
            render: attribute => <strong>{attribute}</strong>
        },
        {
            dataIndex: 'value'
        }
    ]

    return (
        <div className='view'>

            <Table
                showHeader={false}
                bordered
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