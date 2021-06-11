import React from 'react';
import {Progress} from 'antd';

const DashBoard = () => {
    return (
        <>
           <div style={{display: 'flex'}}>
               <div style={{width: '40%', marginRight: 50, marginLeft: 170}}>
                   <Progress percent={30}/>
                   <Progress percent={50} status="active"/>
                   <Progress percent={70} status="exception"/>
                   <Progress percent={100}/>
               </div>
               <div style={{width: '40%'}}>
                   <Progress percent={50} showInfo={false}/>
                   <Progress type="circle" percent={30} width={80}/>
                   <Progress type="circle" percent={70} width={80} status="exception"/>
                   <Progress type="circle" percent={100} width={80}/>
               </div>
           </div>
        </>
    );
};
export default DashBoard