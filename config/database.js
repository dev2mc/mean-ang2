module.exports = {
  database: 'mongodb://admin:admin@ds129610.mlab.com:29610/dashboard_users',
  secret: 'secretsecret',
  options: {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
  }
};
