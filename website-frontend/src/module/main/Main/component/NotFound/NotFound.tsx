import React from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import {Button} from "antd";
import {LINKS} from "type/globals";

import "./NotFound.scoped.scss";

const NotFound: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const goToHome = () => {
        navigate(LINKS.main.home);
    };

    return (
        <section className="not-found">
            <h1>{t("notFound.title")}</h1>
            <div>{t("notFound.text")}</div>
            <Button className="not-found__cta" type="primary" onClick={goToHome}>
                {t("notFound.cta")}
            </Button>
        </section>
    );
};

export default NotFound;
