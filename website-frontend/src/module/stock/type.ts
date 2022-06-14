export type StockParams = {
    ticker: string;
};

export interface StockPrices {
    dates: string[];
    prices: PricesInfo;
}

export interface PricesInfo {
    open: string[];
    close: string[];
    high: string[];
    low: string[];
    adjClose: string[];
}
