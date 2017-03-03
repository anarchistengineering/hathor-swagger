Hathor Swagger
===

Provides Swagger API documentation for Hathor projects.  Hathor Swagger is built on top of [Hapi Swaggard UI](https://github.com/z0mt3c/hapi-swaggered-ui), more details can be found in their documentation about marking up your routes.

Install
---

```
npm install --save hathor-swagger
```

Usage
---

First, you need to load the Hathor Swagger plugin into your application.  While you can configure in swagger support it's just as easy to add it to the plugins on the server:

```javascript
const {Server} = require('hathor');
const Config = require('hathor-config');
const FileConfig = require('hathor-file-config');
const logger = require('hathor-logger');

const config = new Config();
config.merge(new FileConfig('config/config'));
config.set('server.logger', logger);

const serverConfig = config.get('server', {});
const server = new Server(serverConfig);
server.plugins.push(require('hathor-swagger'));

server.start((err)=>{
  logger.error(err);
  process.exit(1);
});
```

Then you need to decorate your routes with contract information:

```javascript
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/api/hello',
  auth: true,
  config: {
    description: 'Basic hello route.',
    notes: 'Returns a greeting based on to passed in.',
    tags: ['api'],
    validate: {
      query: {
        to: Joi.string().optional().description('Who to greet')
      }
    }
  },
  handler(req, reply){
    const to = req.query.to || 'World';
    return reply(`Hello ${to}!`);
  }
};
```

Configuration
===

Configuring the Swagger UI is done through your application configuration even if you include the plugin directly through your server code.  Below is the default configuration shown as part of a full configuration object.

```javascript
module.exports = {
  server: {
    swagger: {
      ui: {
        title: 'Example API',
        path: '/documentation',
        swaggerOptions: {}
      },
      swagger: {
        info: {
          title: 'Example API',
          description: 'Powered by node, hathor, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
          version: '1.0'
        }
      }
    },
    //...rest of your config here...
```
