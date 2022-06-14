import axios, {AxiosRequestConfig, Method} from "axios";
import {API_URL} from "type/globals";

export async function ajax<Request, Response, Path extends string>(method: Method, path: Path, request: Request): Promise<Response> {
    const config: AxiosRequestConfig = {method, url: API_URL + path};
    config.data = request;

    config.headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    const response = await axios.request<Response>(config);
    return response.data;
}
