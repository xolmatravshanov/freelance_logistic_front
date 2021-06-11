import React, {useState} from "react";
import {Radio} from "antd";

const RadioGroup = ({data}) => {

    const [state, setState] = useState(0)

    const onChange = e => {
        setState(e.target.value);
    };

    return (
        <Radio.Group
            value={state}
            options={data}
            onChange={onChange}
            optionType="button"
            buttonStyle="solid"
        >
        </Radio.Group>
    )

}

export default RadioGroup