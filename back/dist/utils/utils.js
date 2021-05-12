"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToArray = exports.removeHtml = void 0;
function removeHtml(string) {
    return string
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/ /g, '');
}
exports.removeHtml = removeHtml;
function convertToArray(input) {
    if (!input)
        return [];
    return Array.isArray(input) ? input : [input];
}
exports.convertToArray = convertToArray;
