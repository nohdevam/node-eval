const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: { type: String, required: true },
	title: {
		type: String,
		required: true
	},
	firstName: { type: String, required: true },
	lastName: { type: String, required: true }
});

const UserSchema = mongoose.model('users', userSchema);

const schema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	title: Joi.string().required(),
	firstName: Joi.string().min(3).max(100).required(),
	lastName: Joi.string().min(3).max(100).required()
});

module.exports.UserSchema = UserSchema;
module.exports.schema = schema;
