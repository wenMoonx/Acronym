"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _mongoose = require("mongoose");
const acronymSchema = new _mongoose.Schema({
    acronym: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});
const acronymModel = (0, _mongoose.model)('Acronym', acronymSchema);
const _default = acronymModel;

//# sourceMappingURL=acronym.model.js.map