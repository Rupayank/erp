"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var util_1 = require("./util");
var allData_1 = require("../model/allData");
module.exports = {
    find: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var db, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        db = new util_1.Database();
                        return [4 /*yield*/, db.getData()];
                    case 1:
                        data = _a.sent();
                        res.send({
                            response: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).send({
                            message: "Internal server error. " + err_1.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    findParticular: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var db, data, output_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        db = new util_1.Database();
                        return [4 /*yield*/, db.getData()];
                    case 1:
                        data = _a.sent();
                        output_1 = {};
                        data.some(function (info) {
                            if (info.id == req.query.id) {
                                output_1 = info;
                                return true;
                            }
                            return false;
                        });
                        if (Object.keys(output_1).length === 0) {
                            res.status(404).send({
                                response: "No data found for id " + req.query.id,
                            });
                        }
                        else {
                            res.send({
                                response: output_1,
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).send({
                            message: "Internal server error. " + err_2.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    addDetails: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, contact, email, level, managerId_1, emp, users, data, idx, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, name_1 = _a.name, contact = _a.contact, email = _a.email, level = _a.level, managerId_1 = _a.managerId;
                        emp = void 0;
                        users = new util_1.Database();
                        return [4 /*yield*/, users.getData()];
                    case 1:
                        data = _b.sent();
                        if (level === "Manager") {
                            emp = new allData_1.Head(name_1, contact, email, level);
                        }
                        else {
                            if (managerId_1) {
                                idx = data.findIndex(function (user) { return user.id === managerId_1; });
                                if (idx >= 0)
                                    emp = new allData_1.Emp(name_1, contact, email, level, managerId_1);
                                else {
                                    return [2 /*return*/, res.status(404).send({
                                            message: "No manager with given id",
                                        })];
                                }
                            }
                            else {
                                return [2 /*return*/, res.status(400).send({
                                        message: "ManagerId is not provided",
                                    })];
                            }
                        }
                        if (!emp.validate(contact, email, level)) return [3 /*break*/, 3];
                        data.push(emp);
                        return [4 /*yield*/, users.saveData(data)];
                    case 2:
                        _b.sent();
                        res.send({
                            message: "Data saved",
                            response: emp,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).send({
                            message: "Invalid details",
                        });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _b.sent();
                        res.status(500).send({
                            message: "Internal server error. " + err_3.message,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    deleteEmp: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, data, filterUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        users = new util_1.Database();
                        return [4 /*yield*/, users.getData()];
                    case 1:
                        data = _a.sent();
                        filterUser = data.filter(function (user) { return user.id != req.query.id; });
                        if (!(data.length == filterUser.length)) return [3 /*break*/, 2];
                        res.status(404).send({
                            message: "No user with id: " + req.query.id + " found.",
                        });
                        return [3 /*break*/, 4];
                    case 2: 
                    //Save data
                    return [4 /*yield*/, users.saveData(filterUser)];
                    case 3:
                        //Save data
                        _a.sent();
                        res.send({
                            status: 200,
                            message: "Deleted",
                        });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        res.status(500).send({
                            message: "Internal server error. " + err_4.message,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    update: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, data, index, _a, name_2, email, contact, level, managerId_2, emp, idx, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        allUsers = new util_1.Database();
                        return [4 /*yield*/, allUsers.getData()];
                    case 1:
                        data = _b.sent();
                        index = data.findIndex(function (user) { return user.id == req.query.id; });
                        if (!(index === -1)) return [3 /*break*/, 2];
                        res.status(404).send({
                            message: "No user with id: " + req.query.id + " found.",
                        });
                        return [3 /*break*/, 5];
                    case 2:
                        data[index] = __assign(__assign({}, data[index]), req.body);
                        _a = data[index], name_2 = _a.name, email = _a.email, contact = _a.contact, level = _a.level, managerId_2 = _a.managerId;
                        emp = void 0;
                        if (level === "Manager") {
                            emp = new allData_1.Head(name_2, contact, email, level);
                        }
                        else {
                            if (managerId_2) {
                                idx = data.findIndex(function (user) { return user.id === managerId_2; });
                                if (idx >= 0)
                                    emp = new allData_1.Emp(name_2, contact, email, level, managerId_2);
                                else {
                                    return [2 /*return*/, res.status(404).send({
                                            message: "No manager with given id",
                                        })];
                                }
                            }
                            else {
                                return [2 /*return*/, res.status(400).send({
                                        message: "ManagerId is not provided",
                                    })];
                            }
                        }
                        if (!emp.validate(contact, email, level)) return [3 /*break*/, 4];
                        //Save data
                        return [4 /*yield*/, allUsers.saveData(data)];
                    case 3:
                        //Save data
                        _b.sent();
                        res.send({
                            message: "Updated",
                            response: data[index],
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(400).send({
                            message: "Invalid details",
                        });
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_5 = _b.sent();
                        res.status(500).send({
                            message: "Internal server error.",
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    findSubord: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, data, output_2, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        allUsers = new util_1.Database();
                        return [4 /*yield*/, allUsers.getData()];
                    case 1:
                        data = _a.sent();
                        output_2 = [];
                        data.forEach(function (info) {
                            if (info.managerId == req.query.id) {
                                output_2.push(info);
                            }
                        });
                        if (output_2.length === 0) {
                            res.status(404).send({
                                response: "No subordinate found for manager id " + req.query.id,
                            });
                        }
                        else {
                            res.send({
                                response: output_2,
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.status(502).send({
                            message: "Internal server error. " + err_6.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
