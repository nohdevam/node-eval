const axios = require('axios');

exports.get_users = (req, res) => {
	axios
		.get('http://localhost:3000/users')
		.then(function(response) {
			res.render('get_users', { users: response.data });
			console.dir(res.headersSent);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.add_user = (req, res) => {
	res.render('add_user');
};

exports.update_user = (req, res) => {
	axios
		.get('http://localhost:3000/users', { params: { id: req.query.id } })
		.then(function(userdata) {
			res.render('update_user', { user: userdata.data });
		})
		.catch((err) => {
			res.send(err);
		});
};
