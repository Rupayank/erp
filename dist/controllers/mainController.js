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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
module.exports = {
    find: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                try {
                    data = fs.readFileSync("data.js");
                    data = JSON.parse(data);
                    res.send({
                        response: data,
                    });
                }
                catch (err) {
                    console.log(err);
                    res.send({
                        status: 502,
                        response: null,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    findParticular: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, output_1;
            return __generator(this, function (_a) {
                try {
                    data = fs.readFileSync("data.js");
                    data = JSON.parse(data);
                    output_1 = {};
                    data.forEach(function (info) {
                        if (info.id == req.query.id) {
                            output_1 = info;
                        }
                    });
                    res.send({
                        response: output_1,
                    });
                }
                catch (err) {
                    res.send({
                        status: 502,
                        message: "Internal server error. " + err.message,
                        response: null,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    addDetails: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, contact, email, level, data, stringifyData;
            return __generator(this, function (_b) {
                try {
                    _a = req.body, name_1 = _a.name, contact = _a.contact, email = _a.email, level = _a.level;
                    data = fs.readFileSync("data.js");
                    data = JSON.parse(data);
                    data.push(req.body);
                    stringifyData = JSON.stringify(data);
                    fs.writeFileSync("data.js", stringifyData);
                    res.send({
                        status: 200,
                        response: data,
                    });
                }
                catch (err) {
                    res.send({
                        status: 502,
                        message: "Internal server error.",
                        response: null,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    deleteEmp: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, filterUser, stringifyData;
            return __generator(this, function (_a) {
                try {
                    data = fs.readFileSync("data.js");
                    data = JSON.parse(data);
                    filterUser = data.filter(function (user) { return user.id != req.query.id; });
                    stringifyData = JSON.stringify(filterUser);
                    fs.writeFileSync("data.js", stringifyData);
                    res.send({
                        status: 200,
                        message: "Deleted",
                        response: filterUser,
                    });
                }
                catch (err) {
                    res.send({
                        status: 502,
                        message: "Internal server error.",
                        response: null,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    update: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, user, stringifyData;
            return __generator(this, function (_a) {
                try {
                    data = fs.readFileSync("data.js");
                    data = JSON.parse(data);
                    user = data.filter(function (user) { return user.id != req.query.id; });
                    user.push(req.body);
                    stringifyData = JSON.stringify(user);
                    fs.writeFileSync("data.js", stringifyData);
                    res.send({
                        status: 200,
                        message: "Updated",
                        response: user,
                    });
                }
                catch (err) {
                    console.log(err);
                    res.send({
                        status: 502,
                        message: "Internal server error.",
                        response: null,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
};
