"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const _config_1 = require("@config");
const error_middleware_1 = tslib_1.__importDefault(require("@middlewares/error.middleware"));
const logger_1 = require("@utils/logger");
// import { SwaggerConfig, generateDocumentation } from 'typescript-swagger';
const _databases_1 = require("@databases");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const express_graphql_1 = require("express-graphql");
const schemas_1 = tslib_1.__importDefault(require("@graphql/schemas"));
const resolvers_1 = tslib_1.__importDefault(require("@graphql/resolvers"));
// const packageJson = require('../package.json');
// const tsConfig = require('../tsconfig.json');
// const swaggerConfig: SwaggerConfig = {
//   yaml: true,
//   name: 'API - Documentation',
//   description: packageJson.description,
//   basePath: '/',
//   host: 'localhost:3000',
//   version: packageJson.version,
//   outputDirectory: 'public',
//   entryFile: path.join('src', 'controllers', '**', '*.ts'),
//   decoratorConfig: {
//     useBuildIn: true,
//     useLibrary: ['typescript-rest', '@decorators/express'],
//   },
//   ignore: ['**/node_modules/**'],
//   consumes: ['application/json'],
//   produces: ['application/json'],
// };
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV || 'development';
        this.port = _config_1.PORT || 3000;
        this.initializeMiddlewares();
        this.connectToDatabase();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req, res) => ({
            schema: schemas_1.default,
            rootValue: resolvers_1.default,
            graphiql: true,
            context: {
                req,
                res,
            },
        })));
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`=================================`);
            logger_1.logger.info(`======= ENV: ${this.env} =======`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    async connectToDatabase() {
        mongoose_1.default
            .connect(_databases_1.dbConnection.url)
            .then(() => logger_1.logger.info('MongoDB connected'))
            .catch(err => logger_1.logger.info('mongoDB is err, ', err));
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    async initializeSwagger() {
        // await generateDocumentation(swaggerConfig, tsConfig);
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs',
                },
            },
            apis: ['swagger.yaml'],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map