var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var models = require('../models');

var service = { authenticate, getById, create };

service.authenticate = authenticate;
service.getById = getById;
service.create = create;

module.exports = service;

function authenticate(username, password) {
  var deferred = Q.defer();
  models.user
    .findOne({ where: { username: username } })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.hash)) {
        // authentication successful
        deferred.resolve({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: jwt.sign({ sub: user.id }, 'string')
        });
      } else {
        // authentication failed
        deferred.resolve();
      }
    })
    .catch((err) => deferred.reject(err.name + ': ' + err.message));

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  models.user
    .findById(_id)
    .then((user) => {
      if (user) {
        // return user (without hashed password)
        deferred.resolve(_.omit(user, 'hash'));
      } else {
        // user not found
        deferred.resolve();
      }
    })
    .catch((err) => deferred.reject(err.name + ': ' + err.message));

  return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();
  // validation
  models.user
    .findOne({ where: { username: userParam.username } })
    .then((user) => {
      console.log('ajunge aici');
      if (user) {
        // username already exists
        deferred.reject(
          'Username "' + userParam.username + '" is already taken'
        );
      } else {
        createUser();
      }
    })
    .catch((err) => deferred.reject(err.name + ': ' + err.message));

  function createUser() {
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');

    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    models.user
      .create(user)
      .then(() => deferred.resolve())
      .catch((err) => deferred.reject(err.name + ': ' + err.message));
  }
  return deferred.promise;
}
