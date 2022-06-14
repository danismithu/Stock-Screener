import {ajax} from "module/common/service/network";
import {StockPrices} from "module/stock/type";
import {PriceAJAXRequest, ScreenerAJAXRequest, ScreenerStocks} from "type/api";

export class ScreenerAJAXWebService {
    static async screenStocks(request: ScreenerAJAXRequest): Promise<ScreenerStocks> {
        return ajax("POST", "/get-stocks/", request);
    }
    static async getPrices(request: PriceAJAXRequest): Promise<StockPrices> {
        return ajax("POST", "/get-stock-price/", request);
    }
}
