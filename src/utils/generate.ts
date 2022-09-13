import path from 'path';
import { SwaggerConfig, generateDocumentation } from 'typescript-swagger';

const packageJson = require('package.json');
const tsConfig = require('tsconfig.json');

export const swaggerConfig: SwaggerConfig = {
  yaml: false,
  name: 'API - Documentation',
  description: packageJson.description,
  basePath: '/',
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

export async function generateSwaggerDocumentation(): Promise<void> {
  console.log('ddd');
  // await generateDocumentation(swaggerConfig, tsConfig);
}
