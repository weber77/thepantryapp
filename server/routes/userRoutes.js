const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/userController');


// router.post('/delete', controller.delete);

// router.post('/update', controller.update)

router.post('/pantry/add', controller.insert);

// router.post('/pantry', controller.)

// router.post('/pantry/delete', controller.delete);

// router.post('/favouriteRecipes/add', controller.insert)

// router.post('/favouriteRecipes/delete', controller.delete);

// router.post('/profile', controller.);

// router.post('/profile/editProfile', controller.)

// router.post('yourRecipes', controller.yourRecipes);


router.post('/register', controller.register);

router.post('/login', controller.login);

router.post('/verify_token', controller.verify_token);

module.exports = router;