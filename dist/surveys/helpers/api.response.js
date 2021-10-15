"use strict";
/**
* @desc    This file contain Success and Error response for sending to client / user
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.error = exports.success = void 0;
/**
 * @desc    Send any success response
 * @param   {string} message
 * @param   {object | array} data
 * @param   {number} statusCode
 */
const success = (message, data, statusCode) => {
    return {
        message,
        error: false,
        code: statusCode,
        data
    };
};
exports.success = success;
/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
const error = (message, statusCode) => {
    /**
     * List of common HTTP request code
     * @note  More http request codes can be added in the future.
     */
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
    if (!findCode)
        statusCode = 500;
    else
        statusCode = findCode;
    return {
        message,
        code: statusCode,
        error: true
    };
};
exports.error = error;
/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
const validation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors
    };
};
exports.validation = validation;
