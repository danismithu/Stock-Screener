import axios, {AxiosRequestConfig} from "axios";
import {ScreenerAJAXRequest, ScreenerStocks} from "type/api";

export class ScreenerAJAXWebService {
    static async screenStocks(request: ScreenerAJAXRequest): Promise<ScreenerStocks> {
        const config: AxiosRequestConfig = {method: "POST", url: "http://localhost:8000/get-stocks/"};
        config.data = request;

        config.headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        const response = await axios.request<ScreenerStocks>(config);
        return response.data;
    }
}
