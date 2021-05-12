"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalRequest = void 0;
var url_1 = __importDefault(require("url"));
var cheerio_1 = __importDefault(require("cheerio"));
var https_1 = __importDefault(require("https"));
var error_1 = require("./error");
var ExternalRequest = (function () {
    function ExternalRequest(url, onResponseEnd) {
        this.url = url;
        this.onResponseEnd = onResponseEnd;
        this.options = {
            host: '',
            path: '',
            port: 80,
            method: 'GET',
            protocol: 'https:',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        this.chunks = [];
    }
    ExternalRequest.prototype.setOptions = function (newOptions) {
        return Object.assign(this.options, newOptions);
    };
    ExternalRequest.prototype._parseUrl = function (url) {
        return url_1.default.parse(url);
    };
    ExternalRequest.prototype.request = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        console.log(_this.url);
                        var httpReq = https_1.default.request(_this.url, function (httpResp) {
                            httpResp.setEncoding('utf8');
                            httpResp.on('data', function (chunk) { return _this.chunks.push(chunk); });
                            httpResp.on('end', function () {
                                var $ = cheerio_1.default.load(_this.chunks.join(''));
                                var data = _this.onResponseEnd($, _this.url);
                                data instanceof Error ? reject(data) : resolve(data);
                            });
                        });
                        httpReq.end();
                        httpReq.on('error', function (err) {
                            reject(new error_1.CustomError(err, "Host " + err['host'] + " is not available"));
                        });
                    })];
            });
        });
    };
    ExternalRequest.prototype.getOptions = function () {
        var url = this._parseUrl(this.url);
        return this.setOptions({
            path: url.path,
            host: url.host
        });
    };
    return ExternalRequest;
}());
exports.ExternalRequest = ExternalRequest;
