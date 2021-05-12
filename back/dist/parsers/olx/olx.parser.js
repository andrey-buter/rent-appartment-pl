"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OlxParser = void 0;
var OlxParser = (function () {
    function OlxParser() {
    }
    OlxParser.prototype.setDOM = function ($) {
        this.$ = $;
    };
    OlxParser.prototype.getRequestPagesCount = function () {
        var count = this.$('.pager .item').length;
        return 0 === count ? 1 : count;
    };
    OlxParser.prototype.getNextRequestLinks = function (url, count) {
        var links = [];
        for (var currentPage = 2; currentPage <= count; currentPage++) {
            links.push(url + "&page=" + currentPage);
        }
        return links;
    };
    OlxParser.prototype.getPageItems = function () {
        var _this = this;
        var listHandler = this.$('.listHandler');
        var items = [];
        if (!listHandler.length) {
            return items;
        }
        var htmlItems = listHandler.find('.wrap');
        htmlItems.each(function (i, el) {
            var _a;
            var $ = _this.$;
            var $el = $(el);
            var $header = $el.find('h3 a');
            var $breadcrumbs = $el.find('.breadcrumb');
            var $img = $el.find('img');
            items.push({
                title: _this.clearText($header.text()),
                url: $header.attr('href'),
                image: ((_a = $img === null || $img === void 0 ? void 0 : $img.attr) === null || _a === void 0 ? void 0 : _a.call($img, 'src')) || '',
                price: _this.clearText($el.find('.price').text()),
                location: _this.clearText($breadcrumbs.eq(1).text()),
                whenAdded: _this.clearText($breadcrumbs.eq(2).text()),
            });
        });
        return items;
    };
    OlxParser.prototype.clearText = function (text) {
        return text.replace('\n', '').trim();
    };
    return OlxParser;
}());
exports.OlxParser = OlxParser;
