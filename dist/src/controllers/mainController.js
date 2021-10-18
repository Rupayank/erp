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
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var allData_1 = require("../allData");
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
            // class Head
            // {				
            // 	id:string=uuidv4();
            // 	name:string;
            // 	contact:number;
            // 	email:string;
            // 	level:string;
            // 	constructor(name:string,contact:number,email:string,level:string)
            // 	{
            // 		this.name=name;
            // 		this.level=level;
            // 		this.contact=contact;
            // 		this.email=email
            // 	}
            // 	validateEmail(mail:string):boolean 
            // 	{
            // 		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) )return true
            // 		return false
            // 	};
            // 	validateContact(input:number):boolean
            // 	{
            // 		var phoneno = /^\d{10}$/;
            // 		let contact=input.toString();
            // 		if(contact.match(phoneno))return true;
            // 		else return false;
            // 	};
            // 	validateLevel(level:string):boolean
            // 	{
            // 		let arr=['Developer','Tester','Intern','Manager','Programmer']
            // 		let test=arr.findIndex(type=>type===level)
            // 		if(test>=0)return true;
            // 		return false;
            // 	}
            // }
            // class Emp extends Head
            // {
            // 	readonly supervisor:string="Manager";
            // 	managerId:string;
            // 	constructor(name:string,contact:number,email:string,level:string,managerId:string)
            // 	{
            // 		super(name, contact, email, level);
            // 		this.managerId=managerId;
            // 	}
            // }
            var emp = void 0;
            var users = new util_1.Database();
            var data = users.getData();
            if (level === "Manager") {
                emp = new allData_1.Head(name_1, contact, email, level);
            }
            else {
                if (managerId_1) {
                    var idx = data.findIndex(function (user) { return user.id === managerId_1; });
                    if (idx >= 0)
                        emp = new allData_1.Emp(name_1, contact, email, level, managerId_1);
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
            if (emp.validate(contact, email, level)) {
                data.push(emp);
                users.saveData(data);
                res.send({
                    message: "Data saved",
                    response: emp
                });
            }
            else {
                res.status(400)
                    .send({
                    message: "Invalid details",
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
                var _a = data[index], name_2 = _a.name, email = _a.email, contact = _a.contact, level = _a.level, managerId_2 = _a.managerId;
                var emp = void 0;
                if (level === 'Manager') {
                    emp = new allData_1.Head(name_2, contact, email, level);
                }
                else {
                    if (managerId_2) {
                        var idx = data.findIndex(function (user) { return user.id === managerId_2; });
                        if (idx >= 0)
                            emp = new allData_1.Emp(name_2, contact, email, level, managerId_2);
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
                if (emp.validate(contact, email, level)) {
                    //Save data
                    allUsers.saveData(data);
                    res.send({
                        message: "Updated",
                        response: data[index],
                    });
                }
                else {
                    res.status(400)
                        .send({
                        message: "Invalid details"
                    });
                }
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
