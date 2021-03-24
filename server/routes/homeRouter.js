const express = require('express');
const axios = require('axios');
const multer = require('multer');

const router = express.Router();
const logController = require('../../controllers/logController');
const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const { RecipeSchema } = require('../../models/recipeModel');

// define storage for the image
const fileStorage = multer.diskStorage({
	// destination for images
	destination: (req, file, callback) => {
		callback(null, './assets/uploads/images');
	},

	// add the extension
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	}
});

const upload = multer({
	storage: fileStorage
});

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

// user routes
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
		.then((userdata) => {
			res.render('user-pages/update_user', { user: userdata.data });
		})
		.catch((err) => {
			res.send(err);
		});
});

router.get('/delete-user', (req, res) => {
	res.render('/user-pages/delete_user');
});

// recipe routes
router.get('/edit-recipe', (req, res) => {
	res.render('recipe-pages/create_recipe');
});

router.get('/view-recipes', (req, res) => {
	axios
		.get('http://localhost:3000/recipes')
		.then((recipedata) => {
			res.render('recipe-pages/view_recipes', { recipes: recipedata.data });
		})
		.catch((err) => {
			res.send(err);
		});
});

router.get('/update-recipe', (req, res) => {
	axios
		.get('http://localhost:3000/recipes', { params: { id: req.query.id } })
		.then((recipedata) => {
			res.render('recipe-pages/update_recipe', { recipe: recipedata.data });
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
router.post('/recipes', upload.single('image'), async (req, res) => {
	console.log(req.file);

	const recipe = new RecipeSchema({
		rec_title: req.body.title,
		categories: req.body.categories,
		image: req.file.filename,
		description: req.body.description,
		author: req.body.author
	});
	await recipe.save();
	res.redirect('/');
});

router.get('/recipes', recipeController.find);
router.put('/recipes/:id', recipeController.update);
router.delete('/recipes/:id', recipeController.delete);

module.exports = router;
