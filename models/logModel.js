const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const logSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true }
});

const LogSchema = mongoose.model('login', logSchema);

const logschema = Joi.object({
	email: Joi.string().min(3).max(100).required(),
	password: Joi.string().min(6).required()
});

module.exports.LogSchema = LogSchema;
module.exports.schema = logschema;
