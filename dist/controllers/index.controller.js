"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
let IndexController = class IndexController {
    constructor(){
        this.index = (req, res, next)=>{
            try {
                res.sendStatus(200);
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = IndexController;

//# sourceMappingURL=index.controller.js.map