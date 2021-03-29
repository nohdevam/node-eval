const mongoose = require('mongoose');
const catchErrors = (asyncFunction) => (...args) => asyncFunction(...args).catch(console.error);

const { UserSchema, schema } = require('../models/userModel');

// retrive and return all users or single user
exports.find = async (req, res) => {
	if (req.query.id) {
		const id = req.query.id;

		await UserSchema.findById(id)
			.then((data) => {
				if (!data) {
					res.status(404).send({ message: 'Not found user with id ' + id });
				} else {
					res.send(data);
				}
			})
			.catch((err) => {
				res.status(500).send({ message: 'Erro retrieving user with id ' + id }, err);
			});
	} else {
		await UserSchema.find()
			.then((user) => {
				res.send(user);
			})
			.catch((err) => {
				res.status(500).send({ message: 'Error Occurred while retriving user information' }, err);
			});
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;

	const verifID = mongoose.Types.ObjectId.isValid(id);

	let body = req.body;

	const verif = schema.validate(body);
	if (!verifID) {
		res.status(400).send({ message: 'id non conforme !' });
		return;
	}
	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}

	await UserSchema.findByIdAndUpdate(id)
		.then((upData) => {
			if (!upData) {
				res.status(404).send({ message: "aucun enregistrement trouvé pour l'id " + id });
				return;
			} else {
				upData.email = body.email;
				upData.password = body.password;
				upData.title = body.title;
				upData.firstName = body.firstName;
				upData.lastName = body.lastName;

				upData.save();
				res.redirect('/get-users');
			}
		})
		.catch((err) => {
			res.status(500).send({ message: 'Erro retrieving user with id ' + id });
		});
};

// delete a user with specified user id
exports.delete = async (req, res) => {
	const id = req.params.id;

	const verifID = mongoose.Types.ObjectId.isValid(id);

	if (!verifID) {
		res.status(400).send("l'id transmis n'est pas conforme");
		return;
	}

	await UserSchema.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
			} else {
				res.redirect('/get-users');
			}
		})
		.catch((err) => {
			res.status(500).send({ message: 'Could not delete User with id=' + id });
		});
};
