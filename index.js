const {
  merge
} = require('hathor-utils');

module.exports=(server, options)=>{
  const config = options.get('swagger', {});
  const uiOptions = merge({
    title: 'Example API',
    path: '/documentation',
    swaggerOptions: {}
  }, config.get('ui', {}).toJS() || {});
  const swaggerOptions = merge({
    info: {
      title: 'Example API',
      description: 'Powered by node, hathor, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
      version: '1.0'
    }
  }, config.get('swagger', {}).toJS() || {});
  const logger = server.logger;
  return {
    plugins: [
      {
        plugin: require('hapi-swaggered'),
        options: swaggerOptions
      },
      {
        plugin: require('hapi-swaggered-ui'),
        options: uiOptions
      }
    ]
  };
};
