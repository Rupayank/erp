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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emp = exports.Head = void 0;
var uuid_1 = require("uuid");
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
    Head.prototype.validateContact = function (input) {
        var phoneno = /^\d{10}$/;
        var contact = input.toString();
        if (contact.match(phoneno))
            return true;
        else
            return false;
    };
    Head.prototype.validateLevel = function (level) {
        var arr = ["Developer", "Tester", "Intern", "Manager", "Programmer"];
        var test = arr.findIndex(function (type) { return type === level; });
        if (test >= 0)
            return true;
        return false;
    };
    Head.prototype.validate = function (input, mail, level) {
        if (this.validateContact(input) &&
            this.validateEmail(mail) &&
            this.validateLevel(level))
            return true;
        return false;
    };
    return Head;
}());
exports.Head = Head;
var Emp = /** @class */ (function (_super) {
    __extends(Emp, _super);
    function Emp(name, contact, email, level, managerId) {
        var _this = _super.call(this, name, contact, email, level) || this;
        _this.managerId = managerId;
        return _this;
    }
    return Emp;
}(Head));
exports.Emp = Emp;
