import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import Profile from '../../pages/employee/profile/Profile'

import OrderCreate from '../../pages/employee/order/Create'
import OrderEdit from '../../pages/employee/order/Edit'
import OrderIndex from '../../pages/employee/order/Index'

import ArchiveCreate from '../../pages/employee/archive/Create'
import ArchiveEdit from '../../pages/employee/archive/Edit'
import ArchiveIndex from '../../pages/employee/archive/Index'

import UserIndex from '../../pages/employee/user/Index'
import UserCreate from '../../pages/employee/user/Create'
import UserEdit from '../../pages/employee/user/Edit'

import SmsReport from '../../pages/employee/sms/sms-report/Index'

import SmsTemp from '../../pages/employee/sms/sms-temp/Index'
import SmsTempCreate from '../../pages/employee/sms/sms-temp/Create'
import SmsTempEdit from '../../pages/employee/sms/sms-temp/Edit'

import SmsMailing from '../../pages/employee/sms/sms-mailing/Index'
import SmsMailingCreate from '../../pages/employee/sms/sms-mailing/Create'
import SmsMailingEdit from '../../pages/employee/sms/sms-mailing/Edit'

const Routes = props => {

    return (
        <Suspense fallback={<h1>Загрузка...</h1>}>

            <Switch>

                <Route exact path='/employee' render={() => <Redirect to='/employee/order'/>}/>



                {/***********PROFILE*********/}
                <Route exact path='/employee/profile' component={Profile}/>
                {/***********PROFILE*********/}



                {/***********Order*********/}
                <Route exact path='/employee/order' component={OrderIndex}/>
                <Route exact path='/employee/order/create' component={OrderCreate}/>
                <Route exact path='/employee/order/edit/:id' component={OrderEdit}/>
                {/***********Order*********/}


                {/***********Order*********/}
                <Route exact path='/employee/archive' component={ArchiveIndex}/>
                <Route exact path='/employee/archive/create' component={ArchiveCreate}/>
                <Route exact path='/employee/archive/edit/:id' component={ArchiveEdit}/>
                {/***********Order*********/}



                {/***********USER*********/}
                <Route exact path='/employee/user' component={UserIndex}/>
                <Route exact path='/employee/user/create' component={UserCreate}/>
                <Route exact path='/employee/user/edit/:id' component={UserEdit}/>
                {/***********USER*********/}



                {/***********SMS*********/}
                <Route exact path='/employee/sms-report' component={SmsReport}/>

                <Route exact path='/employee/sms-temp' component={SmsTemp}/>
                <Route exact path='/employee/sms-temp/create' component={SmsTempCreate}/>
                <Route exact path='/employee/sms-temp/edit/:id' component={SmsTempEdit}/>

                <Route exact path='/employee/sms-mailing' component={SmsMailing}/>
                <Route exact path='/employee/sms-mailing/create' component={SmsMailingCreate}/>
                {/***********SMS*********/}

                

            </Switch>

        </Suspense>
    )

}

export default Routes
