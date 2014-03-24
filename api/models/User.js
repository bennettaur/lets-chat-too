/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string'
    },

    email: {
      type: 'email',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    displayName: {
      type: 'string',
      required: true,
    },

    status: {
      type: 'string',
    },

  },

  // Hash password before creating user
  beforeCreate: function(values, cb) {

    bcrypt.genSalt(10, function(err, salt) {

      if(err) return cb(err);

      bcrypt.hash(values.password, salt, function(err, hash) {
        if(err) return cb(err);
        values.password = hash;
        cb();
      });

    });
  }

};
