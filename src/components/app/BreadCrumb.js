import React from 'react'
import {Breadcrumb} from 'antd'
import {NavLink} from 'react-router-dom'

const BreadCrumbs = ({data}) => {

    return (
        <div style={{paddingBottom: '.5rem'}}>
            <Breadcrumb style={{color: '#fff', display: 'flex'}}>
                {
                    data.map(item => {
                        return (
                            <Breadcrumb.Item key={item.key}>
                                {item.active ? <span style={{fontSize:'20px'}}>{item.title}</span> :
                                    <NavLink to={item.url} style={{color: '#fff'}}>
                                        {item.title}
                                    </NavLink>}
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        </div>
    )

}

export default BreadCrumbs