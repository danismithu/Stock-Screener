import React from "react";
import {Route, Routes} from "react-router-dom";

import {LINKS} from "type/globals";

import Dashboard from "module/home/Dashboard/Dashboard";
import NotFound from "./NotFound/NotFound";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={LINKS.main.notFound} element={<NotFound />} />
            <Route path={LINKS.main.home} element={<Dashboard />} />
            <Route path={LINKS.main.dashboard} element={<Dashboard />} />
        </Routes>
    );
};

export default Router;
