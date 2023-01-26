"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidParam = (value) => {
    let valid = true;
    // check if value is a string
    if (isNaN(parseInt(value))) {
        valid = false;
    }
    else {
        // check if value is an integer
        if (!Number.isInteger(parseFloat(value))) {
            valid = false;
        }
        // check if value is == 0 or a negative number
        if (parseInt(value) <= 0) {
            valid = false;
        }
    }
    return valid;
};
exports.default = isValidParam;
