import React from 'react'
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export default () => {
        return (
            <div style={{ padding:20, fontWeight: 'bold' }}>
                Доступ запрещён
                <br/>
                <Button type='primary' htmlType='submit'>
                <NavLink to="/auth/login">
                    войдите что-бы продолжить
                </NavLink>
                </Button>
            </div>
        )
}