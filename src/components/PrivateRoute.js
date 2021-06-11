import React, { useEffect } from 'react'
import { Route } from "react-router-dom";
import {Auth} from "../api/main";

const PrivateRoute = (props) => {

    const { path, exact, component } = props

    useEffect(() => {

        const token = localStorage.getItem('token')
        Auth.getUser().then(response => {})

    }, [])

    return (
        <Route
            path={path}
            component={component}
            exact={exact}
        />

    )
}

export default PrivateRoute