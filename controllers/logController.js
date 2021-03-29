const crypto = require('crypto');
const salt = crypto.randomBytes(16).toString('hex');

//import user model
const { UserSchema, schema } = require('../models/userModel');

// Handling user signup
exports.register = async (req, res) => {
	const userData = req.body;

	const verif = schema.validate(userData);

	if (verif.error) {
		res.status(400).send(verif.error.details[0].message);
		return;
	}
	await UserSchema.findOne({
		//ensure email is unique, i.e the email is not already in the database
		email: req.body.email
	})
		.then((user) => {
			let hash = crypto.pbkdf2Sync(userData.password, salt, 1000, 64, `sha512`).toString(`hex`);
			userData.password = hash;
			//if the username is unique go ahead and create userData
			if (!user) {
				UserSchema.create(userData)
					.then((user) => {
						//after successfully creating userData display registered message
						res.redirect('/login');
					})
					.catch((err) => {
						//if an error occured while trying to create userData, go ahead and display the error
						res.send('error:' + err);
					});
			} else {
				//if the username is not unique, display that username is already registered with an account
				res.json({ error: 'The email ' + req.body.email + ' is registered with an account' });
			}
		})
		.catch((err) => {
			//display error if an error occured
			res.send('error:' + err);
		});
};

/*Set route for logging in registered users*/
exports.login = async (req, res) => {
	await UserSchema.findOne({
		//check to see if a username like this is in the database
		username: req.body.username,
		password: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`)
	})
		.then((user) => {
			//if the username exist in database then the user exists
			if (user) {
				const payload = {
					username: user.username,
					password: user.password
				};
				//after successful login display token and payload data
				res.redirect('/');
			} else {
				//if user cannot be found, display the message below
				res.json({ error: 'user not found' });
			}
		})
		//catch and display any error that occurs while trying to login user
		.catch((err) => {
			res.send('error:' + err);
		});
};

//export routes usercontroller
