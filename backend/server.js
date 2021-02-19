const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connected yeah!!!');
});

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter); //if you go to this url, it loads everything in exercises router.
app.use('/users', userRouter);

app.listen(port, () => {
	console.log(`server is one ${port}`);
});
