import React from "react";
import {useNavigate} from "react-router-dom";

import {LINKS} from "type/globals";

import {SlidersOutlined} from "@ant-design/icons";

import "./Stocks.scoped.scss";

interface Props {
    name: string;
}

const Stocks: React.FC<Props> = ({name}) => {
    const navigate = useNavigate();

    const openStock = () => {
        navigate(`${LINKS.main.stockDetail}${LINKS.main.paramsRoute.ticker}${name}`);
    };

    return (
        <div className="stocks" onClick={openStock}>
            <div className="stocks__decoration" />
            <div className="stocks__container">
                <div className="stocks__name">{name}</div>
                <div className="stocks__icon">
                    <SlidersOutlined />
                </div>
            </div>
        </div>
    );
};

export default Stocks;
