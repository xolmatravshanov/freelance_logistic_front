import React, {useState} from 'react';
import {Button} from 'antd';
import DropDown from "../app/DropDown";
import {MenuOutlined} from "@material-ui/icons"
import Badge from "../app/Badge";


export default () => {

    const [visible, setVisible] = useState(true)
    const toggleMenu = () => {
        setVisible(!visible)
    }

    return (
        <>
            <div className="navbar">
                <Button
                    onClick={toggleMenu}
                    type="primary"
                    shape="circle"
                    style={{background: '#3751FF', border: 'none'}}
                >
                    <MenuOutlined/>
                </Button>

                <div style={{display: 'flex'}}>
                    <Badge/>
                    <DropDown/>
                </div>
            </div>
        </>
    );
};
