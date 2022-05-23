import React from "react";
import Router from "./component/Router";

import "./Main.scss";

const Main: React.FC = () => {
    return (
        <section className="main">
            <Router />
        </section>
    );
};

export default Main;
