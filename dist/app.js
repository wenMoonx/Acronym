"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _cookieParser = _interopRequireDefault(require("cookie-parser"));
const _express = _interopRequireDefault(require("express"));
const _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
const _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
const _config = require("./config");
const _errorMiddleware = _interopRequireDefault(require("./middlewares/error.middleware"));
const _logger = require("./utils/logger");
const _databases = require("@databases");
const _mongoose = _interopRequireDefault(require("mongoose"));
const _expressGraphql = require("express-graphql");
const _schemas = _interopRequireDefault(require("@graphql/schemas"));
const _resolvers = _interopRequireDefault(require("@graphql/resolvers"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let App = class App {
    listen() {
        this.app.listen(this.port, ()=>{
            _logger.logger.info(`=================================`);
            _logger.logger.info(`======= ENV: ${this.env} =======`);
            _logger.logger.info(`🚀 App listening on the port ${this.port}`);
            _logger.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        _mongoose.default.connect(_databases.dbConnection.url).then(()=>_logger.logger.info('MongoDB connected')).catch((err)=>_logger.logger.info('mongoDB is err, ', err));
    }
    initializeMiddlewares() {
        this.app.use(_express.default.json());
        this.app.use(_express.default.urlencoded({
            extended: true
        }));
        this.app.use((0, _cookieParser.default)());
    }
    initializeGraphql() {
        this.app.use('/graphql', (0, _expressGraphql.graphqlHTTP)((req, res)=>({
                schema: _schemas.default,
                rootValue: _resolvers.default,
                graphiql: true,
                context: {
                    req,
                    res
                }
            })));
    }
    initializeRoutes(routes) {
        routes.forEach((route)=>{
            this.app.use('/', route.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs'
                }
            },
            apis: [
                'swagger.yaml'
            ]
        };
        const specs = (0, _swaggerJsdoc.default)(options);
        this.app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(_errorMiddleware.default);
    }
    constructor(routes){
        this.app = (0, _express.default)();
        this.env = _config.NODE_ENV || 'development';
        this.port = _config.PORT || 3000;
        this.initializeMiddlewares();
        this.connectToDatabase();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
        this.initializeGraphql();
    }
};
const _default = App;

//# sourceMappingURL=app.js.map