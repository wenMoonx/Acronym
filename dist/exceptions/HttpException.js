"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HttpException", {
    enumerable: true,
    get: ()=>HttpException
});
let HttpException = class HttpException extends Error {
    constructor(status, message){
        super(message);
        this.status = status;
        this.message = message;
    }
};

//# sourceMappingURL=HttpException.js.map