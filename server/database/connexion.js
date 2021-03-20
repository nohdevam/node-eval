const mongoose = require('mongoose');

const connectionOtpions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

const connectDB = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, connectionOtpions);
		console.log(`MongoDB connecté: ${db.connection.host}`);
	} catch (err) {
		console.error('Impossible de se connecter', err);
		process.exit(1);
	}
};

module.exports = connectDB;
