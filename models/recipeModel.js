const mongoose = require('mongoose');
const Joi = require('joi');

const schemaRecipe = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String },
	dt_publication: { type: Date },
	author: { type: String, required: true },
	categories: [ { type: String } ],
	image: { type: String },
	published: { type: Boolean }
});

const Recipe = mongoose.model('recipes', schemaRecipe);

const schema = Joi.object({
	title: Joi.string().min(3).max(100).required(),
	content: Joi.string().min(10).max(500).required(),
	author: Joi.string().min(3).max(255).required(),
	categories: Joi.array().items(Joi.string()),
	image: Joi.string().required(),
	published: Joi.boolean().required()
});

module.exports.schema = schema;
module.exports.Recipes = Recipe;
