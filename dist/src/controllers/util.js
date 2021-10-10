"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var fs = require("fs");
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.getData = function () {
        var data = fs.readFileSync("data.js");
        return JSON.parse(data);
    };
    Database.prototype.saveData = function (data) {
        var stringifyData = JSON.stringify(data);
        fs.writeFileSync("data.js", stringifyData);
    };
    return Database;
}());
exports.Database = Database;
