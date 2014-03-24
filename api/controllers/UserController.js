/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('../hebcrypt');

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},

  login: function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.findOneByEmail(email, function(err, user) {

      if(err) {
        res.send(500, {message: "An error occured."});
      }

      if(user) {
        bcrypt.compare(password, user.password, function(err, match) {
          if(match) {
            req.session.userId = user.id;
            res.send(user);
          } else {
            res.send(401, {message: "Invalid password"} );
          }
        });
      } else { 
        res.send(401, {message: "Invalid username"} );
      }

    })
  },

  logout: function(req, res) {
    req.session.destroy();
    res.send(200, {message: "Successfully logged out"});
  }

};
