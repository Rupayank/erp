"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manipulation = void 0;
var fs = require("fs");
var Manipulation = /** @class */ (function () {
    function Manipulation() {
    }
    Manipulation.prototype.getData = function () {
        var data = fs.readFileSync("data.js");
        return JSON.parse(data);
    };
    Manipulation.prototype.saveData = function () {
    };
    return Manipulation;
}());
exports.Manipulation = Manipulation;
