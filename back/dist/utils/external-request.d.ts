/// <reference types="node" />
import URL from "url";
export declare class ExternalRequest {
    private url;
    private onResponseEnd;
    options: {
        host: string;
        path: string;
        port: number;
        method: string;
        protocol: string;
        headers: {
            'Content-Type': string;
        };
    };
    chunks: any[];
    constructor(url: string, onResponseEnd: any);
    setOptions(newOptions: any): any;
    _parseUrl(url: any): URL.UrlWithStringQuery;
    request(): Promise<unknown>;
    private getOptions;
}
