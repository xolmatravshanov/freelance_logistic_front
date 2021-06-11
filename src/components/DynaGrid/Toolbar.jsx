import React from 'react'
import {Button, Modal} from 'antd'
import ExportJsonExcel from 'js-export-excel'
import {DeleteFilled, ExclamationCircleOutlined, FileExcelOutlined, PlusOutlined} from '@ant-design/icons'
import classes from './main.module.css'
import DynaApi from '../../api/dyna'
import {errorNotify} from "../../utils/main";
import {NavLink} from "react-router-dom";

const {confirm} = Modal

const Toolbar = props => {

    const {
        tableName,
        setData,
        setLoading,
        setSelectedRowKeys,
        showCreateModal,
        selectedRowKeys,
        url,
        isClick = true,
        labels,
    } = props

    const tableHeaders = Object.values(labels)

    const downloadExcel = () => {

        DynaApi.getAllData(url)
            .then(({data}) => {

                const toExcel = new ExportJsonExcel({
                    fileName: tableName,
                    type: 'text/plain',
                    datas: [{sheetData: data, sheetHeader: tableHeaders}]
                })
                toExcel.saveExcel()
            })
            .catch(() => errorNotify('Ошибка при Экспортировании таблицы'))

    }

    const showDeleteConfirm = () => {

        confirm({
            title: 'Подтверждение',
            icon: <ExclamationCircleOutlined/>,
            content: 'Вы уверены что хотите удалить эту строку?',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk() {
                return new Promise((resolve, reject) => {

                    DynaApi.deleteRows(url, selectedRowKeys)
                        .then(() => {
                            setSelectedRowKeys([])
                            showCreateModal(false)
                            setLoading(true)
                            DynaApi.getData(url)
                                .then(({data}) => {
                                    if (data.content)
                                        setData(data.content)
                                })
                                .finally(() => setLoading(false))
                            resolve()
                        })
                        .catch(() => reject())

                }).catch(() => errorNotify('Возникла ошибка при удалении строк!'))
            }
        })

    }

    return (

        <div className={classes.header}>

            <div className="left-side" style={{display: 'flex'}}>
                <h1 style={{paddingRight: 10, color:'#fff'}}>{tableName}</h1>
            </div>

            <div className="right-side">

                {
                    isClick ? <NavLink
                        to={`${url}/create`}
                    >
                        <Button
                            type='link'
                            size='large'
                        >
                            <PlusOutlined/>
                            Добавить
                        </Button>
                    </NavLink> : <></>
                }

                {
                    props.delete ? <Button
                        type='link'
                        size='large'
                        disabled={selectedRowKeys.length < 1 ?? true}
                        onClick={() => showDeleteConfirm()}
                        danger
                    >
                        <DeleteFilled/>
                        Удалить
                    </Button> : <> </>
                }

                <Button
                    type='link'
                    size='large'
                    onClick={downloadExcel}
                >
                    <FileExcelOutlined/>
                    Экспорт в Excel
                </Button>
            </div>

        </div>

    )
}
export default Toolbar
