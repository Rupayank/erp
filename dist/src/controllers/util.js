"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var fs = __importStar(require("fs"));
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.getData = function () {
        return new Promise(function (resolve, reject) {
            fs.readFile("data.js", "utf-8", function read(err, data) {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    };
    Database.prototype.saveData = function (data) {
        return new Promise(function (resolve) {
            var stringifyData = JSON.stringify(data);
            resolve(fs.writeFile("data.js", stringifyData, function (err) {
                if (err) {
                    throw err;
                }
            }));
        });
    };
    return Database;
}());
exports.Database = Database;
