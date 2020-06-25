const mongoose = require('mongoose');
const validator = require('validator');
const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please Supply an email Address'
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    }
});

userSchema.virtual('gravatar').get(function() {
    const hash = md5(this.email);
    return `http://gravatar.com/avatar/${hash}?s=200`
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema)