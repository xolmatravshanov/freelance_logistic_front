import React from 'react';
import { DatePicker, Space } from 'antd';

function onChange(date, dateString) {
    console.log(date, dateString);
}

const Index = () => {
    return (
        <Space direction="vertical" size={12}>
            <DatePicker onChange={onChange} />
        </Space>
    );
};

export default Index