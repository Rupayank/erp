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
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var util_1 = require("./util");
module.exports = {
    find: function (req, res) {
        try {
            var db = new util_1.Database();
            var data = db.getData();
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
    },
    findParticular: function (req, res) {
        try {
            //Get data
            var db = new util_1.Database();
            var data = db.getData();
            var output_1 = {};
            data.some(function (info) {
                if (info.id == req.query.id) {
                    output_1 = info;
                    return true;
                }
                return false;
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
    },
    addDetails: function (req, res) {
        try {
            var _a = req.body, name_1 = _a.name, contact = _a.contact, email = _a.email, level = _a.level, managerId_1 = _a.managerId;
            var Head = /** @class */ (function () {
                function Head(name, contact, email, level) {
                    this.id = (0, uuid_1.v4)();
                    this.name = name;
                    this.level = level;
                    this.contact = contact;
                    this.email = email;
                }
                Head.prototype.validateEmail = function (mail) {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
                        return true;
                    return false;
                };
                ;
                Head.prototype.validateContact = function (input) {
                    var phoneno = /^\d{10}$/;
                    var contact = input.toString();
                    if (contact.match(phoneno))
                        return true;
                    else
                        return false;
                };
                ;
                Head.prototype.validateLevel = function (level) {
                    var arr = ['Developer', 'Tester', 'Intern', 'Manager', 'Programmer'];
                    var test = arr.findIndex(function (type) { return type === level; });
                    if (test >= 0)
                        return true;
                    return false;
                };
                return Head;
            }());
            var Emp = /** @class */ (function (_super) {
                __extends(Emp, _super);
                function Emp(name, contact, email, level, managerId) {
                    var _this = _super.call(this, name, contact, email, level) || this;
                    _this.supervisor = "Manager";
                    _this.managerId = managerId;
                    return _this;
                }
                return Emp;
            }(Head));
            var emp = void 0;
            var users = new util_1.Database();
            var data = users.getData();
            if (level === "Manager") {
                emp = new Head(name_1, contact, email, level);
            }
            else {
                if (managerId_1) {
                    var idx = data.findIndex(function (user) { return user.id === managerId_1; });
                    if (idx >= 0)
                        emp = new Emp(name_1, contact, email, level, managerId_1);
                    else {
                        return res.status(404)
                            .send({
                            message: "No manager with given id"
                        });
                    }
                }
                else {
                    return res.status(400)
                        .send({
                        message: "ManagerId is not provided"
                    });
                }
            }
            //Validation
            var valContact = emp.validateContact(contact);
            var valEmail = emp.validateEmail(email);
            var valLevel = emp.validateLevel(level);
            if (valContact && valEmail && valLevel) {
                data.push(emp);
                users.saveData(data);
                res.send({
                    message: "Data saved",
                    response: emp
                });
            }
            else {
                var msg = '';
                if (!valContact)
                    msg += "Invalid contact number ";
                if (!valEmail)
                    msg += "Invalid email id ";
                if (!valLevel)
                    msg += "Invalid employee level ";
                msg += ".";
                res.status(400)
                    .send({
                    message: msg,
                });
            }
        }
        catch (err) {
            res.status(500)
                .send({
                message: "Internal server error. " + err.message,
            });
        }
    },
    deleteEmp: function (req, res) {
        try {
            //Get data
            var users = new util_1.Database();
            var data = users.getData();
            var filterUser = data.filter(function (user) { return user.id != req.query.id; });
            if (data.length == filterUser.length) {
                res.status(404)
                    .send({
                    message: "No user with id: " + req.query.id + " found.",
                });
            }
            else {
                //Save data
                users.saveData(filterUser);
                res.send({
                    status: 200,
                    message: "Deleted",
                    response: filterUser,
                });
            }
        }
        catch (err) {
            res.status(500)
                .send({
                message: "Internal server error. " + err.message,
            });
        }
    },
    update: function (req, res) {
        try {
            //Get data
            var allUsers = new util_1.Database();
            var data = allUsers.getData();
            var index = data.findIndex((function (user) { return user.id == req.query.id; }));
            if (index === -1) {
                res.status(404)
                    .send({
                    message: "No user with id: " + req.query.id + " found.",
                });
            }
            else {
                data[index] = __assign(__assign({}, data[index]), req.body);
                //Save data
                allUsers.saveData(data);
                res.send({
                    status: 200,
                    message: "Updated",
                    response: data[index],
                });
            }
        }
        catch (err) {
            res.status(500)
                .send({
                message: "Internal server error.",
            });
        }
    },
    findSubord: function (req, res) {
        try {
            //Get data
            var allUsers = new util_1.Database();
            var data = allUsers.getData();
            var output_2 = [];
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
    }
};
