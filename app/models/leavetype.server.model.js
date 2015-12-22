/**
 * Created by bsamudrala on 09-12-2015.
 */
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'LeaveTypeSchema'
var LeaveTypeSchema = new Schema({

    type: {
        type: String,
        default: 'Casual-Sick Leave',
        unique:true,
        trim: true,
        required: 'type cannot be blank'
    }, minimumOf: {
        type: Number,
        default: 0.5,
        trim: true
    }, maximumOf: {
        type: Number,
        default: 36,
        trim: true
    }
});
LeaveTypeSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
};

// Create the 'leaveType' model out of the 'LeaveTypeSchema'
mongoose.model('LeaveType', LeaveTypeSchema);