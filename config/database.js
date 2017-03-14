module.exports = {
  database: 'mongodb://mail:937dkio38db283532e@ds139187.mlab.com:39187/mail',
  options: {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
  }
};
