import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {NavLink} from "react-router-dom";

const {SubMenu} = Menu;

const Index = props => {

    const MenuItem = (data) => {

        return data.map((item, index) => (
            item.children ?
                <SubMenu
                    key={`${index}-${item.label}`}
                    title={item.label}
                    icon={item.icon}
                    onTitleClick={() => closeMenu(true)}
                    style={{fontSize:'20px'}}
                >
                    {MenuItem(item.children)}
                </SubMenu>
                :
                <Menu.Item
                    visible={visible}
                    key={`${index}-${item.label}`}
                    icon={item.icon}

                >
                    <NavLink onClick={() => closeMenu(false)} to={`${item.url}`} style={{fontSize:'20px', color:'#fff'}}>{item.label}</NavLink>
                </Menu.Item>
        ))
    }
    const [visible, setVisible] = useState(false);

    const closeMenu = () => {
        setVisible(false)
    }

    return (
        <>
            <Menu
                mode={props.mode}
                theme={props.theme}
            >
                {MenuItem(props.data)}
            </Menu>
        </>
    )
}
export default Index