import React from "react";
import {Route, Routes} from "react-router-dom";

import {LINKS} from "type/globals";

import Dashboard from "module/home/Dashboard/Dashboard";
import NotFound from "./NotFound/NotFound";
import StockDetail from "module/stock/StockDetail/StockDetail";
import Header from "module/common/component/Header/Header";

const Router: React.FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path={LINKS.main.notFound} element={<NotFound />} />
                <Route path={LINKS.main.home} element={<Dashboard />} />
                <Route path={LINKS.main.dashboard} element={<Dashboard />} />
                <Route path={`${LINKS.main.stockDetail}${LINKS.main.params.ticker}`} element={<StockDetail />} />
            </Routes>
        </>
    );
};

export default Router;
