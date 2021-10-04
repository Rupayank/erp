"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var uuid_1 = require("uuid");
var util_1 = require("./util");
var allData_1 = require("../allData");
module.exports = {
    find: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data;
            return __generator(this, function (_a) {
                try {
                    user = new util_1.Manipulation();
                    data = user.getData();
                    res.send({
                        response: data,
                    });
                }
                catch (err) {
                    res.status(500)
                        .send({
                        message: "Internal server error. " + err.message,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    findParticular: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, data, output_1;
            return __generator(this, function (_a) {
                try {
                    users = new util_1.Manipulation();
                    data = users.getData();
                    output_1 = {};
                    data.forEach(function (info) {
                        if (info.id == req.query.id) {
                            output_1 = info;
                            return true;
                        }
                    });
                    if (Object.keys(output_1).length === 0) {
                        res.status(404)
                            .send({
                            response: "No data found for id " + req.query.id
                        });
                    }
                    else {
                        res.send({
                            response: output_1
                        });
                    }
                }
                catch (err) {
                    res.status(500)
                        .send({
                        message: "Internal server error. " + err.message,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    addDetails: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, contact, email, level, managerId, Head, Emp, emp, info, users, data;
            return __generator(this, function (_b) {
                try {
                    _a = req.body, name_1 = _a.name, contact = _a.contact, email = _a.email, level = _a.level, managerId = _a.managerId;
                    Head = /** @class */ (function () {
                        function Head(name, contact, email, level) {
                            this.id = (0, uuid_1.v4)();
                            this.name = name;
                            this.level = level;
                            this.contact = contact;
                            this.email = email;
                        }
                        Head.prototype.jsonOut = function () {
                            var obj = {
                                id: this.id,
                                name: this.name,
                                contact: this.contact,
                                email: this.email,
                                level: this.level
                            };
                            return obj;
                        };
                        return Head;
                    }());
                    Emp = /** @class */ (function (_super) {
                        __extends(Emp, _super);
                        function Emp(name, contact, email, level, managerId) {
                            var _this = _super.call(this, name, contact, email, level) || this;
                            _this.supervisor = "Manager";
                            _this.managerId = managerId;
                            return _this;
                        }
                        return Emp;
                    }(Head));
                    emp = void 0;
                    if (level === "Manager") {
                        emp = new Head(name_1, contact, email, level);
                    }
                    else {
                        emp = new Emp(name_1, contact, email, level, managerId);
                    }
                    info = req.body;
                    allData_1.information.push(info);
                    users = new util_1.Manipulation();
                    data = users.getData();
                    data.push(emp);
                    //Save data
                    users.saveData(data);
                    res.send({
                        status: 200,
                        message: "Data saved",
                        response: emp
                    });
                }
                catch (err) {
                    res.status(500)
                        .send({
                        message: "Internal server error. " + err.message,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    deleteEmp: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, data, filterUser;
            return __generator(this, function (_a) {
                try {
                    users = new util_1.Manipulation();
                    data = users.getData();
                    filterUser = data.filter(function (user) { return user.id != req.query.id; });
                    //Save data
                    users.saveData(filterUser);
                    res.send({
                        status: 200,
                        message: "Deleted",
                        response: filterUser,
                    });
                }
                catch (err) {
                    res.status(500)
                        .send({
                        message: "Internal server error. " + err.message,
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    update: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, data, toUpdate_1, user;
            return __generator(this, function (_a) {
                try {
                    allUsers = new util_1.Manipulation();
                    data = allUsers.getData();
                    toUpdate_1 = {};
                    data.forEach(function (info) {
                        if (info.id == req.query.id) {
                            toUpdate_1 = info;
                            return true;
                        }
                    });
                    user = data.filter(function (user) { return user.id != req.query.id; });
                    Object.assign(toUpdate_1, req.body);
                    user.push(toUpdate_1);
                    //Save data
                    allUsers.saveData(user);
                    res.send({
                        status: 200,
                        message: "Updated",
                        response: toUpdate_1,
                    });
                }
                catch (err) {
                    res.status(500)
                        .send({
                        message: "Internal server error.",
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    findSubord: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, data, output_2;
            return __generator(this, function (_a) {
                try {
                    allUsers = new util_1.Manipulation();
                    data = allUsers.getData();
                    output_2 = [];
                    data.forEach(function (info) {
                        if (info.managerId == req.query.id) {
                            output_2.push(info);
                        }
                    });
                    if (output_2.length === 0) {
                        res.status(404)
                            .send({
                            response: "No subordinate found for manager id " + req.query.id
                        });
                    }
                    else {
                        res.send({
                            response: output_2
                        });
                    }
                }
                catch (err) {
                    res.status(502)
                        .send({
                        message: "Internal server error. " + err.message,
                    });
                }
                return [2 /*return*/];
            });
        });
    }
};
