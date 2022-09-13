"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _indexController = _interopRequireDefault(require("../controllers/index.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let IndexRoute = class IndexRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }
    constructor(){
        this.path = '/';
        this.router = (0, _express.Router)();
        this.indexController = new _indexController.default();
        this.initializeRoutes();
    }
};
const _default = IndexRoute;

//# sourceMappingURL=index.route.js.map