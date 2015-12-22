/**
 * Created by bsamudrala on 09-12-2015.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    Role = mongoose.model('Role'),
    Org = mongoose.model('Org'),
    LeaveType = mongoose.model('LeaveType'),
    Leave = mongoose.model('Leave');


exports.applyLeave = function (req, res, next) {
    var leave = new Leave(req.body);
    var leaveType = new LeaveType(req.body.leaveType);

    LeaveType.find({"type": req.body.leaveType.type}).exec(function (err, data) {
        if (err) {
            console.log(err.message);
        } else {
            if (data.length === 0) {
                LeaveType.collection.insert(leaveType._doc, function (err, r) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        leave.leaveType = new LeaveType(r[0]);
                    }
                });
            } else {
                leave.leaveType = new LeaveType(data[0]);
            }
        }
    });

    //LeaveType.collection.close();

    //leave.leaveType = leaveType;
    //  leave.approval = new User();
    // leave.alternateApproval = new User();
    leave.creator = new User(req.user);
    /*    console.log('req'+req.body);*/
    User.findOne({"username": req.body.approval}, function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: err,
                msg: 'error'
            });
        } else {
            leave.approval = new User(docs);
        }
    });
    User.findOne({"username": req.body.alternateApprover}, function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: err,
                msg: 'error'
            });
        } else {
            leave.alternateApproval = new User(docs);
            Leave.collection.insert(leave._doc, function (err) {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        msg: 'error'
                    });
                } else {
                    console.log("leave success fully applied :)");
                    Leave.find({"creator": req.user._id}).exec(function (err, leaves) {
                        var options = [
                            {
                                path: 'leaves.approval',
                                Model: 'User',
                                select: 'username'
                            },
                            {
                                path: 'leaves.alternateApproval',
                                Model: 'User',
                                select: 'username'
                            },
                            {
                                path: 'leaves.creator',
                                Model: 'User'
                            }];
                        var leaveTypeOption = [{
                            path: 'leaves.leaveType',
                            Model: 'LeaveType',
                            select: 'type'
                        }];
                        if (err) {
                            console.log(leaves[0].creator.username);
                            return res.status(500).json({
                                error: err,
                                msg: 'error'
                            });
                        } else {

                            //res.json(leaves);
                            Leave.populate(leaves, leaveTypeOption, function (err, data) {
                             if (err) {
                             console.log(err);
                             } else {
                                 Leave.populate(data, options, function (err, users) {
                             if (err) {
                                console.log(err);
                             } else {
                                     console.log(users[0].creator.username);
                             res.json(users);
                             }
                             });
                             }
                             });

                            /* var promise =  User.populate(leaves,options);
                             promise.then(console.log).end();
                             res.json(leaves);*/
                            //console.log(leaves);

                            //res.send(doc._doc);
                            //if(doc.items.length>0) {
                            //
                            //}
                        }
                    });

                }

            });

        }
    });


},

    exports.editLeave = function (req, res, next) {
        var id = req.params.id;
        var leave = new Leave(req.body);
        if (leave.reason) {
            Leave.findOneAndUpdate({_id: id}, leave, function (err, data) {
                if (err) {
                    res.status(500).json({
                        error: err,
                        msg: 'error'
                    });
                } else {
                    console.log("Leave updated success fully");
                }

            });
        } else {
            Leave.find({"_id": id}).exec(function (err, leave) {
                if (err) {
                    res.status(500).json({
                        error: err,
                        msg: 'error'
                    });
                } else {
                    res.json(leave)

                }
            });
        }
    },
    exports.deleteLeave = function (req, res, next) {
        var id = req.params.id;
        Leave.remove({"_id": id}, function (err, docs) {
            if (err) {
                return res.status(500).json({
                    error: err,
                    msg: 'error'
                });
            } else {
                Leave.find().exec(function (err, leaves) {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            msg: 'error'
                        });
                    } else {
                        res.json(leaves)
                    }
                });
            }
        });
    }
exports.listLeaves = function (req, res, next) {
    Leave.find({"creator": req.user._id}, function (err, docs) {
        if (err) {
            return res.status(500).json({
                error: err,
                msg: 'error'
            });
        } else {
            res.jsonp(docs);
        }
    });

}



