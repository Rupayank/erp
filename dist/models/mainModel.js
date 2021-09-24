"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var employee = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose_1.default.model("employee", employee);
