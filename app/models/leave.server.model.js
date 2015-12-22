/**
 * Created by bsamudrala on 09-12-2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'LeaveSchema'
var LeaveSchema = new Schema({
    appliedDate:{
        type:Date,
        default:Date.now
    },
    fromDate: {
        type: Date,
        default: Date.now
    },
    toDate: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    reason: {
        type: String,
        trim: true,
        required:true
    },
    leaveType: {
        type: Schema.ObjectId,
        ref: 'LeaveType',
        required: true
    },
    status: {
        type: String,
        default: 'Pending to approve',
        trim: true
    },
    approval: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    alternateApproval: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    approvedBy:{
        type: String,
        default:"Deep"

    }
});
/**
 * Validations
 */
LeaveSchema.path('reason').validate(function(reason) {
    return !!reason;
}, 'Reason cannot be blank');

LeaveSchema.path('leaveType').validate(function(leaveType) {
    return !!leaveType;
}, 'please select the leaveType from drop down');

LeaveSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
};

// Create the 'leave' model out of the 'LeaveSchema'
mongoose.model('Leave', LeaveSchema);