/**
 * Created by bsamudrala on 09-12-2015.
 */
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var RoleSchema = new Schema({
    role:{
        type:String,
        default:'ADMIN',
        unique:true
    }
});

var Role = mongoose.model('Role',RoleSchema);
module.exports = Role;