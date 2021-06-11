import React, {useState} from 'react';
import {Input, Space} from 'antd';
import classes from './Layout.module.css'

const {Search} = Input;

const Index = (props) => {

    const [value, setValue] = useState(1)
    const valueChangeHandler = event => {

        const filtered = props.filter((props) => {
            return props.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
        })
        setValue({filtered})
    }


    return (
        <Space direction="horizontal">
            <div className={classes.search}>
                <Search
                    placeholder="Искать..."
                    /*onSearch={onSearch}*/
                    bordered={false}
                    allowClear
                    onChange={valueChangeHandler}
                    value={value}

                />
            </div>
        </Space>
    );
};

export default Index