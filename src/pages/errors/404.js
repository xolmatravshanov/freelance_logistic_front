import React from 'react'
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export default () => {
    return (
        <div style={{ padding:20, fontWeight: 'bold' }}>
            Страница не найдена
            <br/>
            <Button type='primary' htmlType='submit'>
                <NavLink to="/users">
                    вернутся на главную
                </NavLink>
            </Button>
        </div>
    )
}