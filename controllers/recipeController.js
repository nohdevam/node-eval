const mongoose = require('mongoose');

const { RecipeSchema, recschema } = require('../models/recipeModel');

// create and save new recipe
exports.create = async (req, res) => {
	// console.log(req.body);
	const recipe = new RecipeSchema({
		title: req.body.title,
		categories: req.body.categories,
		image: req.file.filename,
		description: req.body.description,
		author: req.body.author
	});
	const verif = recschema.validate(recipe);

	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}
	await recipe.save();
	res.redirect('/');
};

// retrive and return all recipes or single
exports.find = async (req, res) => {
	if (req.query.id) {
		const id = req.query.id;

		await RecipeSchema.findById(id)
			.then((data) => {
				if (!data) {
					res.status(404).send('Not found recipe with id ' + id);
				} else {
					res.send(data);
				}
			})
			.catch((err) => {
				res.status(500).send('Erro retrieving user with id ' + id);
			});
	} else {
		await RecipeSchema.find()
			.then((recipe) => {
				res.send(recipe);
			})
			.catch((err) => {
				res.status(500).send('Error Occurred while retriving user information');
			});
	}
};

exports.update = async (req, res) => {
	const id = req.query.id;

	const verifID = mongoose.Types.ObjectId.isValid(id);

	let body = req.body;
	let file = req.file;

	const verif = recschema.validate(body, file);
	if (!verifID) {
		res.status(400).send('id non conforme !');
		return;
	}

	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}

	await RecipeSchema.findById(id)
		.then((upData) => {
			if (!upData) {
				res.status(404).send("aucun enregistrement trouvé pour l'id " + id);
				return;
			}

			upData.image = file.filename;
			upData.title = body.title;
			upData.categories = body.categories;
			upData.description = body.description;
			upData.author = body.author;
			upData.timeCreated = body.timeCreated;

			upData.save();
			res.redirect('/');
		})
		.catch((err) => {
			res.status(500).send('Error Update recipe information');
		});
};

// delete a recipe with specified recipe id
exports.delete = async (req, res) => {
	const id = req.params.id;

	const verifID = mongoose.Types.ObjectId.isValid(id);

	if (!verifID) {
		res.status(400).send("l'id transmis n'est pas conforme");
		return;
	}

	await RecipeSchema.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				res.status(404).send(`Cannot Delete with id ${id}. Maybe id is wrong`);
			} else {
				res.redirect('/view-recipes');
			}
		})
		.catch((err) => {
			res.status(500).send('Could not delete recipe with id=' + id);
		});
};
