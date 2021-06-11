import React from "react"
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from "./store/reducers"

import './index.css'
import 'antd/dist/antd.css'
import {ConfigProvider} from "antd";
import {lang} from "./utils/lang";
import App from "./App";
import {Helmet} from "react-helmet";

const myStore = createStore(rootReducer)

ReactDOM.render(
    <Provider store={myStore}>
        <Helmet title="NTL GROUP" />
        <ConfigProvider locale={lang}>
        <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
