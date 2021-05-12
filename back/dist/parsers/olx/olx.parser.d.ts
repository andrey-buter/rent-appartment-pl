/// <reference types="cheerio" />
import { ItemModel } from "../../models";
export declare class OlxParser {
    $: cheerio.Root;
    setDOM($: cheerio.Root): void;
    getRequestPagesCount(): number;
    getNextRequestLinks(url: any, count: any): string[];
    getPageItems(): ItemModel[];
    private clearText;
}
