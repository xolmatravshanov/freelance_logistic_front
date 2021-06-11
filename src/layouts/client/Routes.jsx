import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Order from '../../pages/client/order/Index'
import Edit from "../../pages/client/order/Edit";

const Routes = props => {
    return (
        <Suspense fallback={<h1>Загрузка...</h1>}>
            <Switch>
                <Route exact path="/client" render={() => <Redirect to='/client/order'/>} />
                <Route exact path='/client/order' component={Order}/>
                <Route exact path='/client/order/edit/:id' component={Edit}/>
            </Switch>
        </Suspense>
    )
}

export default Routes
