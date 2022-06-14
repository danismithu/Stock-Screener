import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

import {ScreenerAJAXWebService} from "service/ScreenerAJAXWebService";
import {PriceAJAXRequest} from "type/api";
import {StockParams, StockPrices} from "../type";
import {formatDate} from "module/common/utils/formatDate";

import {message} from "antd";
import {VictoryAxis, VictoryBrushContainer, VictoryCandlestick, VictoryChart, VictoryZoomContainer} from "victory";
import Loading from "module/common/component/Loading/Loading";

import variables from "asset/style/_variables.scss";
import "./StockDetail.scoped.scss";

const CHART_WIDTH = 1000;
const CHART_HEIGHT = 500;
const PARENT_CHART_STYLE = {parent: {maxWidth: "90%"}};
const CHART_SCALE: any = {x: "time"};
const CHART_PADDING = {top: 0, left: 50, right: 50, bottom: 30};

const StockDetail: React.FC = () => {
    const {t} = useTranslation();
    const {ticker} = useParams<StockParams>();
    const [loading, setLoading] = useState<boolean>(false);
    const [stockPrices, setStockPrices] = useState<StockPrices | null>(null);
    const [selectedDomain, setSelectedDomain] = useState<any>();
    const [zoomDomain, setZoomDomain] = useState<any>();

    const fetchStockPrice = async () => {
        if (!ticker) return;
        setLoading(true);
        try {
            // Get the data of just the last 9 months to get a better looking graph
            const today = new Date();
            const oneYearBack = new Date(today.getFullYear() - 1, today.getMonth() + 3, today.getDate());
            const request: PriceAJAXRequest = {
                ticker,
                startDate: formatDate(oneYearBack),
                endDate: formatDate(today),
            };
            const response = await ScreenerAJAXWebService.getPrices(request);
            setStockPrices(response);
        } catch (e) {
            message.error(t("error.error500"));
        }
        setLoading(false);
    };

    const handleZoom = (domain: any) => {
        setSelectedDomain(domain);
    };

    const handleBrush = (domain: any) => {
        setZoomDomain(domain);
    };

    useEffect(() => {
        fetchStockPrice();
    }, []);

    return (
        <section className="stock-detail">
            <div className="stock-detail__header">
                <h1 className="header-title">{ticker}</h1>
                <img className="header-background" src={require("asset/images/background.png")} />
            </div>
            {loading || !stockPrices ? (
                <Loading />
            ) : (
                <div className="stock-detail__chart-container">
                    <VictoryChart
                        width={CHART_WIDTH}
                        height={CHART_HEIGHT}
                        style={PARENT_CHART_STYLE}
                        domainPadding={{x: 0}}
                        scale={CHART_SCALE}
                        containerComponent={<VictoryZoomContainer zoomDimension="x" zoomDomain={zoomDomain} onZoomDomainChange={handleZoom} />}
                    >
                        <VictoryCandlestick
                            candleColors={{positive: variables.positive, negative: variables.negative}}
                            data={stockPrices.dates.map((date, key) => {
                                return {
                                    x: new Date(date),
                                    open: stockPrices.prices.open[key],
                                    close: stockPrices.prices.close[key],
                                    high: stockPrices.prices.high[key],
                                    low: stockPrices.prices.low[key],
                                };
                            })}
                        />
                    </VictoryChart>
                    <VictoryChart
                        width={CHART_WIDTH}
                        height={CHART_HEIGHT / 5}
                        style={PARENT_CHART_STYLE}
                        scale={CHART_SCALE}
                        padding={CHART_PADDING}
                        containerComponent={<VictoryBrushContainer brushDimension="x" brushDomain={selectedDomain} onBrushDomainChange={handleBrush} />}
                    >
                        <VictoryAxis
                            tickValues={stockPrices.dates.map(date => {
                                return new Date(date);
                            })}
                            tickFormat={_ => ""}
                        />
                        <VictoryCandlestick
                            candleColors={{positive: variables.positive, negative: variables.negative}}
                            data={stockPrices.dates.map((date, key) => {
                                return {
                                    x: new Date(date),
                                    open: stockPrices.prices.open[key],
                                    close: stockPrices.prices.close[key],
                                    high: stockPrices.prices.high[key],
                                    low: stockPrices.prices.low[key],
                                };
                            })}
                        />
                    </VictoryChart>
                </div>
            )}
        </section>
    );
};

export default StockDetail;
