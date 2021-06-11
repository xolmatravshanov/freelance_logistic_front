import React from 'react'
import OrderHistory from "../order_history/Index";
import {Button} from "antd";
import {NavLink} from "react-router-dom";



const Edit = props => {

    let id = props.match.params.id;

    return (
       <>
           <div style={{display:'flex'}}>
               <Button type='primary' style={{marginLeft:'20px'}}>
                   <NavLink to={'/client/order'}>
                       Вернутся на главную
                   </NavLink>
               </Button>
           </div>
           <div style={{display:'flex', justifyContent:'center' }}>
               <OrderHistory id={id}/>
           </div>
       </>
    )
}

export default Edit