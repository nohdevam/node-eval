const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const methodOverride = require('method-override');

const connectDB = require('./server/database/connexion');
const homeRouter = require('./server/routes/homeRouter');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method', { methods: [ 'POST', 'GET' ] }));

//connection Mongodb
connectDB();

//utilisation de ejs
app.set('view engine', 'ejs');

// load fichiers statiques
app.use(express.static(path.join(__dirname, './assets')));
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
//parse request

/*app.use((req, res, next) => {
	const { method, path } = req;
	console.log(`Méthode: ${method} | Path: ${path}`);
	next(); // next permet de passé à la suite, de ne pas tourner en boucle
});*/

//import routes
app.use('/', homeRouter);
//app.use('/admin/get-users', UserRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Serveur connecté au PORT: ${PORT}`);
});
