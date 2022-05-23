import React from "react";

import {Select} from "antd";
const {Option} = Select;

import "./OptionSelect.scoped.scss";

interface Props {
    title: string;
    item: string[][];
    withDefault?: boolean;
    handleChange: (value: string) => void;
}

const OptionSelect: React.FC<Props> = ({title, item, withDefault = false, handleChange}) => {
    return (
        <div className="option-select">
            <div className="option-select__title">{title}</div>
            <Select defaultValue={withDefault ? item[0][0] : null} onChange={handleChange} className="option-select__input">
                {item.map((option, key) => {
                    return (
                        <Option key={key} value={option[0]}>
                            {option[1]}
                        </Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default OptionSelect;
