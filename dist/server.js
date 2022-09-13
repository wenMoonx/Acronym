"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = _interopRequireDefault(require("./app"));
const _acronymRoute = _interopRequireDefault(require("./routes/acronym.route"));
const _validateEnv = _interopRequireDefault(require("./utils/validateEnv"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _validateEnv.default)();
const app = new _app.default([
    new _acronymRoute.default()
]);
app.listen();

//# sourceMappingURL=server.js.map