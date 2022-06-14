import React from "react";

import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

import "./Loading.scoped.scss";

const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />;

const Loading: React.FC = () => {
    return (
        <div className="loading">
            <Spin indicator={antIcon} />
        </div>
    );
};

export default Loading;
