import React from 'react';

import {List} from 'antd';

const title = [
    {
        title: 'title',
    },
    {
        title: 'title1',
    },
    {
        title: 'title2',
    },
    {
        title: 'title3',
    },
    {
        title: 'title4',
    },
    {
        title: 'title5',
    },
]

const map = title.map(label => {

    return Object.values(label)
})

const Index = () => {
    return (
        <>
            <List>
                <List.Item>{/*key={key} style={style}*/}
                    <List.Item.Meta
                    />
                    {map}
                    <div>data</div>
                </List.Item>
            </List>
        </>
    );
};
export default Index