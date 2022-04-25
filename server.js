const express = require('express');
const bodyParser = require('body-parser');
var logger = require('morgan');
var Sequelize = require('sequelize');
var expressJwt = require('express-jwt');
var nodemailer = require('nodemailer');
var path = require('path');
var sequelize = new Sequelize('restaurant_app', 'uroot', '', {
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

const userTable = sequelize.import('./models/users');
const orderTable = sequelize.import('./models/orders');
const restaurantTable = sequelize.import('./models/restaurants');
const menuItemTable = sequelize.import('./models/menuItems');
const intermediatesTable = sequelize.import('./models/intermediates');

userTable.hasMany(orderTable);
orderTable.belongsTo(restaurantTable);
restaurantTable.hasMany(orderTable);
orderTable.belongsToMany(menuItemTable, { through: intermediatesTable });
menuItemTable.belongsToMany(orderTable, { through: intermediatesTable });

var users = require('./routes/users');
var orders = require('./routes/orders');
var restaurants = require('./routes/restaurants');
var intermediates = require('./routes/intermediates');
var menuItems = require('./routes/menuItems');
var forgotPassword = require('./routes/forgotPassword');
var resetPassword = require('./routes/resetPassword');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //  res.setHeader("Access-Control-Allow-Origin", "http://https://616f41467de44aa9ac47d1a7ee0281b6.vfs.cloud9.us-east-2.amazonaws.com");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization '
  );
  next();
});

// app.use(expressJwt({
//     secret: 'string',
//     getToken: function(req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             return req.headers.authorization.split(' ')[1];
//         }
//         else if (req.query && req.query.token) {
//             return req.query.token;
//         }
//         return null;
//     }
// }).unless({
//     path: ['/create', '/users/authenticate', '/users/register','/users', '/resetPassword','/forgotPassword',
//     '/inline.bundle.js', '/styles.bundle.js', '/polyfills.bundle.js', '/polyfills.bundle.js', '/vendor.bundle.js', '/main.bundle.js',
//         '/inline.bundle.js.map', '/polyfills.bundle.js.map', '/styles.bundle.js.map', '/vendor.bundle.js.map', '/main.bundle.js.map']
// }));

app.get('/api/create', (req, res) => {
  sequelize
    .sync({ force: true })
    .then(() => res.status(201).send('tables created'))
    .catch((err) => {
      console.warn(err);
      res.status(500).send('error...');
    });
});

app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/restaurants', restaurants);
app.use('/api/intermediates', intermediates);
app.use('/api/menuItems', menuItems);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/resetPassword', resetPassword);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).send('some error...');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
