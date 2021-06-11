import React from 'react'
import {connect} from 'react-redux'
import Footer from '../../components/app/Footer'
import Menu from '../main/Menu'
import Navbar from '../main/Navbar'
import {toggleMenu} from '../../store/main/actions'
import Routes from './Routes'
import {SendOutlined, MessageOutlined, UserOutlined, BarsOutlined, MessageFilled, PicLeftOutlined, BookOutlined} from '@ant-design/icons'


const menuData = [
    {
        label: 'Перевозки',
        url: '/employee/order',
        icon: <BarsOutlined style={{ fontSize: '20px'}} />,
    },
    {
        label: 'Архив',
        url: '/employee/archive',
        icon: <BookOutlined style={{ fontSize: '20px'}} />,
    },
    {
        label: 'Клиенты',
        url: '/employee/user',
        icon: <UserOutlined style={{ fontSize: '20px'}} />,
    },
    {
        label: 'СМС',
        url: '#',
        icon: <MessageFilled style={{ fontSize: '20px'}} />,
        children: [
            {
                label: 'Отчёт по СМС',
                url: '/employee/sms-report',
                icon: <PicLeftOutlined style={{ fontSize: '20px'}} />,
            },
            {
                label: 'Настройка СМС',
                url: '/employee/sms-temp',
                icon: <MessageOutlined style={{ fontSize: '20px'}} />,
            },
            {
                label: 'СМС отправка',
                url: '/employee/sms-mailing',
                icon: <SendOutlined style={{ fontSize: '20px'}} />,
            },
        ]
    },
]

const Layout = (props) => {

    return (
        <div className="wrapper">

            <Menu data={menuData} {...props} />

            <div className="main">

                <div>
                    <Navbar {...props} />
                    <div className="content">
                        <Routes routes={menuData}/>
                    </div>
                </div>

                <Footer/>

            </div>

        </div>
    )
}

const states = (state) => ({
    visibleMenu: state.main.visibleMenu,
})

const actions = {
    toggleMenu,
}

export default connect(states, actions)(Layout)
