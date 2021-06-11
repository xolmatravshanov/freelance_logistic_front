import {Button, Modal, Table} from 'antd'
import React, {useEffect} from 'react'
import classes from './main.module.css'
import Toolbar from './Toolbar'
import EyeFilled from '@ant-design/icons/lib/icons/EyeFilled'
import EditFilled from '@ant-design/icons/lib/icons/EditFilled'

import DynaApi from '../../api/dyna'
import View from "./View";
import {emptyText} from "../../utils/main";
import {NavLink} from "react-router-dom";

const Layout = props => {

    const {
        tableName = 'Заголовок таблицы',
        columns = [],
        labels = [],
        data = [],
        setData,
        loading,
        setLoading,
        pagination,
        setPagination,
        isClick = true,
        url
    } = props

    columns.filter(record => {

        if (!record.render) {
            record.render = (value) => {
                if (!value)
                    return emptyText()
                return value
            }
        }

        return record
    })

    const genColumns = Array.prototype.concat(
        [
            {
                title: () => <strong>#</strong>,
                dataIndex: 'serial',
                render: (text, record, index) => {
                    return (pagination.current - 1) * pagination.pageSize + index + 1
                },
                width: 50,
                align: 'center',
                fixed: 'left'
            },
        ],
        columns
    )

    const getData = (params) => {

        setLoading(true)

        DynaApi.getDatas(url, params, props.paramsData)
            .then(({data}) => {

                const content = data.content

                const filterData = []
                content.filter(row => {
                    let newObj = {}
                    for (const attribute in row) {
                        if (labels.hasOwnProperty(attribute))
                            newObj[attribute] = row[attribute]
                    }
                    filterData.push(newObj)
                })

                setData(filterData)
                setPagination({
                    current: data['page'],
                    pageSize: data['pageSize'],
                    total: data['totalCount'],
                })
            })
            .finally(() => {
                setLoading(false)
            })

    }

    let params = {
        page: 1,
        'per-page': 50
    }

    const getSort = (field, order) => {
        switch (order) {
            case 'ascend':
                return field
            case 'descend':
                return `-${field}`
            default:
                return null
        }
    }

    const handleTableChange = ({current, pageSize}, filters, {field, order}) => {

        const sort = getSort(field, order)

        params = {page: current, 'per-page': pageSize}
        if (sort) params = {...params, sort}

        getData(params)

    }

    useEffect(() => getData(params), [])

    const onRow = isClick ? (record, rowIndex) => {
        return {
            onClick: event => {
                window.location = `order/edit/${record.id}`
            },
        };
    } : null

    return (

        <div>

            <Toolbar tableName={tableName} {...props} />

            <Table
                bordered
                onRow={onRow}
                size={'small'}
                columns={genColumns}
                rowKey={record => record.id}
                dataSource={props.dataSource.length > 0 ? props.dataSource : data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{x: '100%'}}
            />

        </div>

    )
}

Layout.defaultProps = {
    dataSource: []
}

export default Layout