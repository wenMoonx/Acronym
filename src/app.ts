import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { SwaggerConfig, generateDocumentation } from 'typescript-swagger';
import { dbConnection } from '@databases';
import { connect, set } from 'mongoose';
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import schemas from '@graphql/schemas';
import resolvers from '@graphql/resolvers';

const packageJson = require('../package.json');
const tsConfig = require('../tsconfig.json');

const swaggerConfig: SwaggerConfig = {
  yaml: true,
  name: 'API - Documentation',
  description: packageJson.description,
  basePath: '/',
  host: 'localhost:3000',
  version: packageJson.version,
  outputDirectory: 'public',
  entryFile: path.join('src', 'controllers', '**', '*.ts'),
  decoratorConfig: {
    useBuildIn: true,
    useLibrary: ['typescript-rest', '@decorators/express'],
  },
  ignore: ['**/node_modules/**'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes(routes);
    this.initializeSwagger();

    this.app.use(
      '/graphql',
      graphqlHTTP((req, res, graphqlParams) => ({
        schema: schemas,
        rootValue: resolvers,
        graphiql: true,
        context: {
          req,
          res,
        },
      })),
    );
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    try {
      await connect(dbConnection.url, dbConnection.options);
      logger.info('MongoDB Connected.');
    } catch (error) {
      logger.info('MongoDB ConnectError:', error);
    }
  }
  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    // this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    // this.app.use(hpp());
    // // this.app.use(helmet());
    // this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private async initializeSwagger() {
    await generateDocumentation(swaggerConfig, tsConfig);
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

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
