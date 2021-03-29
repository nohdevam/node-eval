const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const recSchema = new Schema({
	rec_title: { type: String, required: true },
	categories: [ { type: String } ],
	image: { type: String, default: 'placeholder.jpg' },
	description: [ { type: String } ],
	author: { type: String, required: true },
	timeCreated: {
		type: Date,
		default: Date.now
	}
});

const RecipeSchema = mongoose.model('recipes', recSchema);

const recschema = Joi.object({
	rec_title: Joi.string().min(3).max(100).required(),
	categories: Joi.array().items(Joi.string()),
	image: Joi.string().required(),
	description: Joi.array().items(Joi.string()),
	author: Joi.string().min(3).max(255).required(),
	timeCreated: Joi.date().iso()
});

module.exports.recschema = recschema;
module.exports.RecipeSchema = RecipeSchema;
