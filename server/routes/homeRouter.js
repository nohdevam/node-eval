const express = require('express');
const axios = require('axios');
const router = express.Router();
const logController = require('../../controllers/logController');
const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/register', (req, res) => {
	res.render('log-pages/register');
});

router.get('/login', (req, res) => {
	res.render('log-pages/login');
});

router.get('/admin', (req, res) => {
	res.render('dashboard');
});

router.get('/get-users', (req, res) => {
	axios
		.get('http://localhost:3000/users')
		.then(function(response) {
			res.render('user-pages/get_users', { users: response.data });
		})
		.catch((err) => {
			res.send(err);
		});
});

router.get('/update-user', (req, res) => {
	axios
		.get('http://localhost:3000/users', { params: { id: req.query.id } })
		.then(function(userdata) {
			res.render('user-pages/update_user', { user: userdata.data });
		})
		.catch((err) => {
			res.send(err);
		});
});

router.get('/edit-recipes', (req, res) => {
	axios
		.get('http://localhost:3000/recipes')
		.then(function(response) {
			res.render('recipe-pages/create_recipe', { recipe: response.data });
		})
		.catch((err) => {
			res.send(err);
		});
});

// home & log routes
router.get('/');
router.post('/users', logController.register);
router.post('/login', logController.login);

//users routes
router.get('/users', userController.find);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// recipes route
router.post('/recipes', recipeController.create);
router.get('/recipes', userController.find);
router.put('/recipes/:id', userController.update);
router.delete('/recipes/:id', userController.delete);

module.exports = router;
