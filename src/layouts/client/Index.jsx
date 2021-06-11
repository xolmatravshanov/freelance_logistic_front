import React from 'react'
import {connect} from 'react-redux'
import Footer from '../../components/app/Footer'
import Navbar from '../main/Navbar'
import {toggleMenu} from '../../store/main/actions'
import Routes from './Routes'
import {
    BarsOutlined,
} from '@ant-design/icons'

const menuData = [
    {
        label: 'Перевозки',
        url: '/client/order',
        icon: <BarsOutlined/>,
    },

]

const Layout = (props) => {

    return (
        <div className="wrapper">
            <div className="main">
                <div>
                    <Navbar {...props} isUser={true} />
                    <div className="content">
                        <Routes />
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
