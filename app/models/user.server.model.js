var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	username: {
		type: String,
		unique: true,
		required: 'Username is required',
		trim: true
	},
	password: {
		type: String,
		validate: [
			function(password) {
				return password && password.length > 6;
			}, 'Password should be longer'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	},
    organization:{
        type:Schema.ObjectId,
        default:Schema.ObjectId("5667f110d07f998ea94ee83f"),
        ref: 'Org'
    },
    role:{
        type:Schema.ObjectId,
        default:Schema.ObjectId("5667f18fd07f998ea94ee840"),
        ref:'Role'
    },
    mobileNumber:{
      type:Number,
        required:'Mobile number is required',
        default:9848022338
    }

});

// Hook a pre save method to hash the password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

// Create instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	if(password && this.salt) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	}
};

// Create instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};
UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.hashed_password;
    delete obj.salt;
    return obj;
};

mongoose.model('User', UserSchema);