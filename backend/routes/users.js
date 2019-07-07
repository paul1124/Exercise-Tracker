const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find() // Mongoose method that gets list of all of the users from Mongo database
  // Returns a promise
    .then(users => res.json(users))
    // Then get all the users in json
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    // Save to database
    .then(() => res.json('User added!'))
    // User added in json
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;