export interface ScreenerStocks {
    stocks: string[];
}

export interface ScreenerAJAXRequest {
    roaFilter: string;
    npmFilter: string;
    analystRecomFilter: string;
    shortOptionFilter: string;
    sma20Filter: string;
    sma50Filter: string;
}

export interface PriceAJAXRequest {
    ticker: string;
    startDate: string;
    endDate: string;
}
