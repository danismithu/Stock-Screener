import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {ScreenerAJAXWebService} from "service/ScreenerAJAXWebService";
import {ANALYST_RECOM, NET_PROFIT, ROA, SHORT_OPTION, SMA20, SMA50} from "../type";

import {Button, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import OptionSelect from "./component/OptionSelect/OptionSelect";
import Stocks from "./component/Stocks/Stocks";

import "./Dashboard.scoped.scss";

const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />;

const Dashboard: React.FC = () => {
    const {t} = useTranslation();
    const [roaFilter, setRoaFilter] = useState<string | null>(null);
    const [npmFilter, setNpmFilter] = useState<string | null>(null);
    const [analystRecomFilter, setAnalystRecomFilter] = useState<string | null>(null);
    const [shortOptionFilter, setShortOptionFilter] = useState<string | null>(null);
    const [sma20Filter, setSma20Filter] = useState<string | null>(null);
    const [sma50Filter, setSma50Filter] = useState<string | null>(null);
    const [stocks, setStocks] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchStocks = async () => {
        setLoading(true);
        const response = await ScreenerAJAXWebService.screenStocks({
            roaFilter: roaFilter || "",
            npmFilter: npmFilter || "",
            analystRecomFilter: analystRecomFilter || "",
            shortOptionFilter: shortOptionFilter || "",
            sma20Filter: sma20Filter || "",
            sma50Filter: sma50Filter || "",
        });
        setStocks(response.stocks);
        setLoading(false);
    };

    const handleRoaChange = (value: string) => {
        setRoaFilter(value);
    };

    const handleNpmChange = (value: string) => {
        setNpmFilter(value);
    };

    const handleAnalystRecomChange = (value: string) => {
        setAnalystRecomFilter(value);
    };

    const handleShortOptionChange = (value: string) => {
        setShortOptionFilter(value);
    };

    const handleSma20Change = (value: string) => {
        setSma20Filter(value);
    };

    const handleSma50Change = (value: string) => {
        setSma50Filter(value);
    };

    const StocksContainer = () => {
        return (
            <div className="dashboard__stocks-container">
                {stocks &&
                    stocks.map((stock, key) => {
                        return <Stocks key={key} name={stock} />;
                    })}
            </div>
        );
    };

    return (
        <section className="dashboard">
            <h2>{t("dashboard.title")}</h2>
            <div className="dashboard__filters-container">
                <div>
                    <div className="dashboard__select-container">
                        <OptionSelect title={t("dashboard.filters.roa")} item={ROA} handleChange={handleRoaChange} />
                        <OptionSelect title={t("dashboard.filters.npm")} item={NET_PROFIT} handleChange={handleNpmChange} />
                        <OptionSelect title={t("dashboard.filters.analyst_recom")} item={ANALYST_RECOM} handleChange={handleAnalystRecomChange} />
                    </div>
                    <div className="dashboard__select-container">
                        <OptionSelect title={t("dashboard.filters.optionShort")} withDefault item={SHORT_OPTION} handleChange={handleShortOptionChange} />
                        <OptionSelect title={t("dashboard.filters.sma20")} item={SMA20} handleChange={handleSma20Change} />
                        <OptionSelect title={t("dashboard.filters.sma50")} item={SMA50} handleChange={handleSma50Change} />
                    </div>
                </div>
                <Button type="primary" onClick={fetchStocks}>
                    {t("dashboard.cta")}
                </Button>
            </div>
            {loading ? <Spin indicator={antIcon} /> : <StocksContainer />}
        </section>
    );
};

export default Dashboard;
