/**
 * Created by bsamudrala on 09-12-2015.
 */
var users = require('../../app/controllers/users.server.controller'),
    Leaves = require('../../app/controllers/leave.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    // Setting up the local authentication
    app.route('/auth/apply').post(Leaves.applyLeave);
    app.route('/auth/edit/:id').put(Leaves.editLeave);
    app.route('/auth/getData').get(Leaves.listLeaves);
    app.route('/auth/deleteLeave/:id').delete(Leaves.deleteLeave);
};