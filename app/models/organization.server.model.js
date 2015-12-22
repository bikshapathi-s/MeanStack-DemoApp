/**
 * Created by bsamudrala on 09-12-2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrgScheama = new Schema({
    name:{
        type:String,
        default:'Nextsphere Technology',
        unique:true

    },
    address:{
        type:String,
        default:'Hyderabad'
    }
});

mongoose.model('Org',OrgScheama);