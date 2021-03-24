const mongoose = require('mongoose');

const catchErrors = (asyncFunction) => (...args) => asyncFunction(...args).catch(console.error);

const { RecipeSchema, recschema } = require('../models/recipeModel');

// create and save new recipe
exports.create = async (req, res) => {
	// console.log(request.body);
	const recipe = new RecipeSchema({
		title: req.body.title,
		categories: req.body.categories,
		image: req.file.filename,
		description: req.body.description,
		author: req.body.author
	});
	await recipe.save();
	res.redirect('/');
};

{
	/*exports.create = catchErrors(upload.single('image'), async (req, res) => {
	const body = req.body;
	const verif = schema.validate(body);
	// validate request
	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}
	// new user
	const recipe = new RecipeSchema(body);
	// save recipe
	await recipe.save(recipe);
	res.redirect('/');
});*/
}

// retrive and return all recipes or single
exports.find = catchErrors(async (req, res) => {
	if (req.query.id) {
		const id = req.query.id;

		const data = await RecipeSchema.findById(id);

		if (!data) {
			res.status(404).send({ message: 'Not found recipe with id ' + id });
		} else {
			res.send(data);
		}
	} else {
		const recipe = await RecipeSchema.find();
		res.send(recipe);
	}
});

exports.update = async (req, res) => {
	const id = req.params.id;

	const verifID = mongoose.Types.ObjectId.isValid(id);

	let body = req.body;
	let file = req.file;

	const verif = recschema.validate(body);
	if (!verifID) {
		res.status(400).send('id non conforme !');
		return;
	}

	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}

	let upData = await RecipeSchema.findById(id);

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

	await upData.save();
	res.redirect('/');
};

// delete a recipe with specified recipe id
exports.delete = (req, res) => {
	const id = req.params.id;

	RecipeSchema.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
			} else {
				res.send({
					message: 'Recipe was deleted successfully!'
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Recipe with id=' + id
			});
		});
};
