const router = require('express').Router();
let User = require('../models/user.model');

//localhost:5000/users/
//if get request.
router.route('/').get((req, res) => {
	User.find() //mongoose method. Returns a promise in json
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

//localhost:5000/users/add
//post request. Adds and save a new user.
router.route('/add').post((req, res) => {
	const username = req.body.username;
	const newUser = new User({username});

	newUser
		.save()
		.then(() => res.json('User added!!!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
