const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//localhost:5000/exercises/
//get all users in database.
router.route('/').get((req, res) => {
	Exercise.find()
		.then((exercises) => res.json(exercises))
		.catch((err) => res.status(400).json('Error: ' + err));
});

//localhost:5000/add
//add new user.
router.route('/add').post((req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({
		username,
		description,
		duration,
		date,
	});

	newExercise
		.save()
		.then(() => res.json('Exercise added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
