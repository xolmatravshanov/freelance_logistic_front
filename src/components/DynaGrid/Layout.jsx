import {Modal, Table} from 'antd'
import React, {useEffect} from 'react'
import Toolbar from './Toolbar'
import DynaApi from '../../api/dyna'
import {emptyText} from "../../utils/main";

const Layout = props => {

    const {
        tableName = 'Заголовок таблицы',
        columns = [],
        labels = [],
        editContent = () => {
        },
        data = [],
        setData,
        isClick = true,
        loading,
        setLoading,
        pagination,
        setPagination,
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
                fixed: 'left',
            },
        ],
        columns,
        /* [
             {
                 title: 'Действия',
                 dataIndex: 'action',
                 width: '100px',
                 fixed: 'right',
                 align: 'center',
                 render: (text, record) => {

                     return (
                         <div className={classes.actionColumn}>

                             <Button
                                 shape='circle'
                                 onClick={() => {
                                     let viewTitle = props.viewTitle ?? 'View title'
                                     viewTitle = viewTitle.replace('{id}', record.id)
                                     props.changeModalTitle(viewTitle)
                                     props.setModalContent(<View record={record} labels={labels}/>)
                                     props.showModal(true)
                                 }}
                             >
                                 <EyeFilled/>
                             </Button>


                             <NavLink
                                 to={`${url}/edit/${record.id}`}
                             >
                                 <Button
                                     style={{marginLeft: '.3em'}}
                                     shape='circle'
                                     onClick={() => {
                                         let updateTitle = props.updateTitle ?? 'Edit title'
                                         updateTitle = updateTitle.replace('{id}', record.id)
                                        //props.changeModalTitle(updateTitle)
                                        //props.setModalContent(editContent(record))
                                     }}
                                 >
                                     <EditFilled/>
                                 </Button>
                             </NavLink>

                         </div>
                     )
                 }
             },
         ]*/
    )

    const getData = (params) => {

        setLoading(true)

        DynaApi.getData(url, params, props.paramsData)
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
                window.location = `${url}/edit/${record.id}`
            },
        };
    } : null

    return (

        <div>

            <Toolbar tableName={tableName} {...props} />

            <Modal
                title={`${props.createModalTitle}`}
                footer={false}
                visible={props.visibleCreateModal}
                onCancel={() => props.showCreateModal(false)}
                width={700}
                style={{top: 20}}
            >
                {props.createModalContent}
            </Modal>

            <Modal
                title={props.modalTitle}
                footer={false}
                visible={props.visibleModal}
                onCancel={() => {
                    props.showModal(false)
                }}
                width={700}
                style={{top: 20}}
            >
                {props.modalContent}
            </Modal>

            <Table
                bordered
                onRow={onRow}
                size={'small'}
                columns={genColumns}
                rowKey={record => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowSelection={{
                    type: 'checkbox',
                    fixed: 'left',
                    onChange: (selectedRowKeys) => {
                        props.setSelectedRowKeys(selectedRowKeys)
                    },
                    selectedRowKeys: props.selectedRowKeys
                }}
                scroll={{x: '100%'}}
            />

        </div>

    )
}

export default Layout