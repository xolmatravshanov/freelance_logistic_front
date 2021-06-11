import React from 'react'

import Menu from '../../components/Menu'

const Index = props => {

    const {visibleMenu} = props
   
    return (
        <div className={`side ${!visibleMenu ? "closed-side" : ""}`}>
            <div className="menu-header">
                <img className="menu-header-title" src="/images/NTL.png" alt="123"/>
            </div>
            <div style={{marginTop: '30px', height:'250px'}}>
                <Menu data={props.data} theme="dark" mode="inline"/>
            </div>
            <div style={{marginTop: '60px'}}>
                <img src="/images/train.png" alt=""/>
            </div>
        </div>
    )
}
export default Index