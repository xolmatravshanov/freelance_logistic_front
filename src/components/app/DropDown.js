import React from 'react';
import {Dropdown, Menu} from 'antd';
import {DownOutlined, UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import classes from './Layout.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const DropDown = props => {

    const MenuItem = () => {
        return <Menu>
            <Menu.Item
                icon={<UserOutlined/>}
            >
                <NavLink to="/employee/profile">Личные данные</NavLink>
            </Menu.Item>

            <Menu.Divider/>
            <Menu.Item
                icon={<PoweroffOutlined/>}
                danger
            >
                <NavLink to="/login">Выйти</NavLink>
            </Menu.Item>

        </Menu>
    }

    const {userData} = props

    return (
        <>
            <div className={classes.dropdown}>
                <Dropdown overlay={MenuItem} placement="bottomLeft" trigger={['click']}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <NavLink to="#" className={classes.dropdownButton}>
                        {userData.name} <img src={userData.image ? userData.image : '/images/temprorary.png'} style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        margin: '0 .5rem 0 .5rem'
                    }} alt="YourProfilePhoto"/><DownOutlined/>
                    </NavLink>
                </Dropdown>
            </div>
        </>
    );
};

const states = state => ({
    userData: state.main.userData
})

export default connect(states)(DropDown)