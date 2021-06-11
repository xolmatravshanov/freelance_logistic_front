import React from 'react'
import { Button } from 'antd'
import { LeftOutlined, PoweroffOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
    const  {
        isUser = false
    } = props
 
    return (
            <div className="navbar" style={{backgroundColor:'#34E4BA'}}>
                {
                    props.isUser ? <div style={{display: "flex"}} >
                        <img className={`footer-logo`} src={`/images/NTL.png`} alt="123333"/>
                    </div> : <div style={{display: "flex"}} />
                }
                <div style={{display: "flex"}}>
                    <NavLink to="/logout">
                        <Button type="primary" danger>
                            Выйти <PoweroffOutlined />
                        </Button>
                    </NavLink>
                </div>
            </div>
    );
};

export default (NavBar)