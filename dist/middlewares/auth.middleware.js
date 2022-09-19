"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = require("@config");
const HttpException_1 = require("@exceptions/HttpException");
const authMiddleware = async (req, res, next) => {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = _config_1.SECRET_KEY;
            if (secretKey === Authorization) {
                next();
            }
            else {
                next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.HttpException(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map