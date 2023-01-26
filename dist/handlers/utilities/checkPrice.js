"use strict";
exports.__esModule = true;
var isValidPrice = function (value) {
    var valid = true;
    // check if value is == 0 or a negative number
    if (value <= 0) {
        valid = false;
    }
    return valid;
};
exports["default"] = isValidPrice;
