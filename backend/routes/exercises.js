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

router.route('/:id').get((req, res) => {
	Exercise.findById(req.params.id)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then(() => res.json('Exercise Deleted!!!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Exercise.findById(req.params.id)
		.then((exercise) => {
			exercise.username = req.body.username; //save update data to fields that already exist
			exercise.description = req.body.description;
			exercise.duration = Number(req.body.duration);
			exercise.date = Date.parse(req.body.date);

			exercise
				.save()
				.then(() => res.json('Exercise updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
