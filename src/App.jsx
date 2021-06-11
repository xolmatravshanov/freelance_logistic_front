import React, {useEffect, useState} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import Auth from './api/auth'
import {setUserData} from './store/main/actions'
import Login from './pages/auth/Login'
import Employee from './layouts/employee/Index'
import Client from './layouts/client/Index'
import {Spin} from "antd";

const App = props => {

    const {userData, setUserData} = props

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        Auth.getUser()
            .then(response => {

                if (response.data)
                    setUserData(response.data)
                else
                    localStorage.clear()

                setLoading(false)
            })

    }, [])

    const ToMain = () => <Redirect to={`/${userData.role}`}/>

    const renderRoute = (prop) => {
        switch (prop) {

            case 'employee':
                return <Route path='/employee' component={Employee}/>

            case 'client':
                return <Route path='/client' component={Client}/>

            default:
                return null
        }
    }

    return loading ?
        <div className="loading-main">
            <Spin size="large"/>
        </div>
        : (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/logout' render={() => {
                         localStorage.clear();
                         window.location = '/login';
                     }}/>

                    <Route exact path='/login' render={() => {
                        if (userData.role) return <ToMain/>
                        return <Login/>
                    }}/>
                    
                    {userData.role ? renderRoute(userData.role) : <Redirect to='/login'/>}
                    <Route exact path='/' component={ToMain}/>
                    <Route render={() => <h1>404 Not found</h1>}/>
                </Switch>
            </BrowserRouter>
        )

}

const states = state => ({
    userData: state.main.userData
})

const actions = {
    setUserData
}

export default connect(states, actions)(App)