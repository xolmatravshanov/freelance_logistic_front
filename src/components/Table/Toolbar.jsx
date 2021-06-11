import React from 'react'
import {Button, Modal, Typography} from 'antd'
import ExportJsonExcel from 'js-export-excel'
import {DeleteFilled, ExclamationCircleOutlined, FileExcelOutlined, PlusOutlined} from '@ant-design/icons'
import classes from './main.module.css'
import DynaApi from '../../api/dyna'
import {errorNotify} from "../../utils/main";
import EditFilled from "@ant-design/icons/lib/icons/EditFilled";
import {NavLink} from "react-router-dom";

const {confirm} = Modal

const Toolbar = props => {

    const {
        tableName,
        url,
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

    return (

        <div className={classes.header}>

            <div className="left-side" style={{display: 'flex'}}>
                <h1 style={{paddingRight: 10}}>{tableName}</h1>
            </div>

        </div>

    )
}
export default Toolbar
