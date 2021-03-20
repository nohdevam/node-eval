const mongoose = require('mongoose');
const catchErrors = (asyncFunction) => (...args) => asyncFunction(...args).catch(console.error);

const { UserSchema, schema } = require('../models/userModel');

// create and save new user
{
	/*exports.create = catchErrors(async (req, res) => {
	const body = req.body;
	const verif = schema.validate(body);
	// validate request
	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}
	// new user
	const user = new UserSchema(body);
	// save user
	await user.save(user);
	res.redirect('/');
});*/
}

// retrive and return all users or single user
exports.find = catchErrors(async (req, res) => {
	if (req.query.id) {
		const id = req.query.id;

		const data = await UserSchema.findById(id);

		if (!data) {
			res.status(404).send({ message: 'Not found user with id ' + id });
		} else {
			res.send(data);
		}
	} else {
		const user = await UserSchema.find();
		res.send(user);
	}
});

exports.update = async (req, res) => {
	const id = req.params.id;

	const verifID = mongoose.Types.ObjectId.isValid(id);

	let body = req.body;

	const verif = schema.validate(body);
	if (!verifID) {
		res.status(400).send('id non conforme !');
		return;
	}

	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}

	let upData = await UserSchema.findById(id);

	if (!upData) {
		res.status(404).send("aucun enregistrement trouvé pour l'id " + id);
		return;
	}

	upData.email = body.email;
	upData.password = body.password;
	upData.title = body.title;
	upData.firstName = body.firstName;
	upData.lastName = body.lastName;

	await upData.save();
	res.redirect('/get-users');
};

// delete a user with specified user id
exports.delete = async (req, res) => {
	const id = req.params.id;
	try {
		const verifID = mongoose.Types.ObjectId.isValid(id);

		if (!verifID) {
			res.status(400).send("l'id transmis n'est pas conforme");
			return;
		}

		const delUser = await UserSchema.findByIdAndDelete(id);

		if (delUser) {
			res.status(200).send('Utilisateur supprimé avec succés');
		} else {
			res.status(404).send(`Id ${id} non trouvé`);
		}
	} catch (err) {
		res.status(500).send("Erreur survenue lors de l'operation");
	}
};
