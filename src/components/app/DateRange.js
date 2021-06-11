import React, {useState} from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;



const DateRange = () => {


    const onChange = (date, dateString) => {
        console.log(dateString)
    }
    return (

            <RangePicker
                ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={onChange}

            />

    );
};

export default DateRange