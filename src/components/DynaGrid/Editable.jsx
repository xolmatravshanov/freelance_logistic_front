import React from 'react'
import {Button, Input, Table} from 'antd'
import EditFilled from "@ant-design/icons/lib/icons/EditFilled";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import SaveOutlined from "@ant-design/icons/lib/icons/SaveOutlined";

const data = []
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    })
}

const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

const labels = {
    id: 'ID',
    number: 'Номер перевозки',
    contact_name: 'Имя клиента',
    contact_phone: 'Телефон номер клиента',
    status_logistics: 'Статус логистики',
    status_callcenter: 'Статус колл-центра',
    comment_agent: 'Комментарий оператора',
    date_deliver: 'Дата доставки',
    time_deliver: 'Время доставки',
}

const columns = [
    {
        title: labels['id'],
        dataIndex: 'id',
        sorter: true,
        notEdit: true,
        align: 'center',
        width: '80px'
    },
    {
        title: labels['number'],
        dataIndex: 'number',
        sorter: true,
        align: 'center',
    },
    {
        title: labels['contact_name'],
        dataIndex: 'contact_name',
        sorter: true,
        align: 'center',
        ellipsis: true,
    },
    {
        title: labels['contact_phone'],
        dataIndex: 'contact_phone',
        sorter: true,
        ellipsis: true,
        align: 'center',
    },
    {
        title: labels['status_logistics'],
        dataIndex: 'status_logistics',
        sorter: true,
        align: 'center',
    },
    {
        title: labels['status_callcenter'],
        dataIndex: 'status_callcenter',
        sorter: true,
        ellipsis: true,
        align: 'center',
    },
    {
        title: labels['comment_agent'],
        dataIndex: 'comment_agent',
        sorter: true,
        align: 'center',
        ellipsis: true,
    },
    {
        title: labels['date_deliver'],
        dataIndex: 'date_deliver',
        sorter: true,
        align: 'center',
        ellipsis: true,
    },
    {
        title: labels['time_deliver'],
        dataIndex: 'time_deliver',
        sorter: true,
        align: 'center',
    },
]

columns.filter(record => {

    if (!record.render) {
        record.render = (value) => {
            return `${record.title}`
        }
    }

    return record;

})

class EditableTable extends React.Component {

    constructor(props) {
        super(props);

        columns.filter(record => {

            record.render = (text, rec) => {

                if (record.notEdit)
                    return record.title

                return this.renderColumns(record.title, rec, record.dataIndex)
            }

            return record;

        })

        this.columns = Array.prototype.concat(columns, [
            {
                title: 'operation',
                dataIndex: 'operation',
                width: '120px',
                render: (text, record) => {
                    const {editable} = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                        <Button
                                            style={{marginRight: '10px'}}
                                            shape='circle'
                                        >
                                            <SaveOutlined/>
                                        </Button>
                                        <Button
                                            shape='circle'
                                        >
                                            <CloseOutlined/>
                                        </Button>
                                    </span>

                                    : <EditFilled onClick={() => this.edit(record.key)}>Edit</EditFilled>
                            }
                        </div>
                    );
                },
            }
        ])

        this.state = {data};
        this.cacheData = data.map(item => ({...item}));
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({data: newData});
        }
    }

    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({data: newData});
        }
    }

    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({data: newData});
            this.cacheData = newData.map(item => ({...item}));
        }
    }

    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({data: newData});
        }
    }

    render() {
        return <Table bordered dataSource={this.state.data} columns={this.columns}/>;
    }
}


export default EditableTable