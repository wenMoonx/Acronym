"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _config = require("../config");
const _httpException = require("../exceptions/HttpException");
const authMiddleware = async (req, res, next)=>{
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = _config.SECRET_KEY;
            if (secretKey === Authorization) {
                next();
            } else {
                next(new _httpException.HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new _httpException.HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new _httpException.HttpException(401, 'Wrong authentication token'));
    }
};
const _default = authMiddleware;

//# sourceMappingURL=auth.middleware.js.map