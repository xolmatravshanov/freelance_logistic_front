import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./store/reducers";
import App from "./App";

import "./index.css";
import "antd/dist/antd.css";
import {ConfigProvider, Radio,} from "antd";

import moment from 'moment';
import 'moment/locale/zh-cn';
import ruRU from 'antd/lib/locale/ru_RU';
import enUS from 'antd/lib/locale/en_US';
moment.locale('en');
const myStore = createStore(rootReducer);
class Apps extends React.Component {
    constructor() {
        super();
        this.state = {
            locale: enUS,
        };
    }

    changeLocale = e => {
        const localeValue = e.target.value;
        this.setState({ locale: localeValue });
        if (!localeValue) {
            moment.locale('en');
        } else {
            moment.locale('zh-cn');
        }
    };

    render() {
        const { locale } = this.state;
        return (
            <div>
                <div className="change-locale">
                    <span style={{ marginRight: 16 }}>Выбрать Язык: </span>
                    <Radio.Group value={locale} onChange={this.changeLocale}>
                        <Radio.Button key="en" value={enUS}>
                            English
                        </Radio.Button>
                        <Radio.Button key="cn" value={ruRU}>
                            Русский
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <ConfigProvider locale={locale}>
                    <Provider store={myStore}>
                        <App />
                    </Provider>,
                </ConfigProvider>
            </div>
        );
    }
}

ReactDOM.render(<Apps/>, document.getElementById("root"));
