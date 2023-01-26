"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidPrice = (value) => {
    let valid = true;
    // check if value is == 0 or a negative number
    if (value <= 0) {
        valid = false;
    }
    return valid;
};
exports.default = isValidPrice;
