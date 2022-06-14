import React from "react";
import {useNavigate} from "react-router-dom";

import {LINKS} from "type/globals";

import "./Header.scoped.scss";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate(LINKS.main.home);
    };

    return (
        <div className="header">
            <img className="header__logo" onClick={goToHome} src={require("asset/images/logo.png")} alt="Gorilla Stock" />
        </div>
    );
};

export default Header;
