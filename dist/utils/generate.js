"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    swaggerConfig: ()=>swaggerConfig,
    generateSwaggerDocumentation: ()=>generateSwaggerDocumentation
});
const _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const packageJson = require('package.json');
const tsConfig = require('tsconfig.json');
const swaggerConfig = {
    yaml: false,
    name: 'API - Documentation',
    description: packageJson.description,
    basePath: '/',
    version: packageJson.version,
    outputDirectory: 'public',
    entryFile: _path.default.join('src', 'controllers', '**', '*.ts'),
    decoratorConfig: {
        useBuildIn: true,
        useLibrary: [
            'typescript-rest',
            '@decorators/express'
        ]
    },
    ignore: [
        '**/node_modules/**'
    ],
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'
    ]
};
async function generateSwaggerDocumentation() {
    console.log('ddd');
}

//# sourceMappingURL=generate.js.map