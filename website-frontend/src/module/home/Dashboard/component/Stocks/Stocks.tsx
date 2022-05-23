import React from "react";

import "./Stocks.scoped.scss";

interface Props {
    name: string;
}

const Stocks: React.FC<Props> = ({name}) => {
    return (
        <div className="stocks">
            <div className="stocks__name">{name}</div>
        </div>
    );
};

export default Stocks;
