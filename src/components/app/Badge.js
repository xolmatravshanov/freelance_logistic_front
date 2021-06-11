import React from 'react';
import {Badge, Dropdown, Menu} from 'antd';
import classes from "./Layout.module.css";
import {BellFilled, ExclamationOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
const MenuItem = () => {
    return <Menu>
        <Menu.Item
            icon={<UserOutlined/>}>
            <NavLink to="incoming">
                Входящие
            </NavLink>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item
            icon={<ExclamationOutlined/>}
            danger>
            <NavLink to="allposts">
                Все сообщения
            </NavLink>
        </Menu.Item>
    </Menu>
}

const Index = () => {
    return (
        <button className={classes.badgeButton}>
            <Dropdown overlay={MenuItem} placement="bottomRight" trigger={['click']}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={classes.dropdownButton}>
                    <BellFilled style={{fontSize: '25px', color: '#fff', fontWeight: 'BOLD'}}/>
                    <Badge count={5} offset={[-11, -30]}>
                    </Badge>
                </a>
            </Dropdown>
        </button>
    );
};

export default Index