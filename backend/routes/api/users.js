const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//checks to see if req.body.email exists and is an email, 
//req.body.username is a minimum length of 4 and is not an email,
//and req.body.password is not empty and has a minimum length of 6
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please enter a valid email')
        .isLength({ max: 250 })
        .withMessage('Please enter an email that is less than 250 characters'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Username is required')
        .isLength({ min: 4 })
        .withMessage('Please enter a username that is greater than 4')
        .isLength({ max: 30 })
        .withMessage('Please enter a username that is less than 30 characters'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.')
        .isLength({ max: 250 })
        .withMessage('Please enter a password that is less than 250 characters'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required')
        .isLength({ max: 250 })
        .withMessage('Please enter a first name that is less than 250 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required')
        .isLength({ max: 250 })
        .withMessage('Please enter a last name that is less than 250 characters'),
    handleValidationErrors
];

// Sign up w/ validateSignup middleware
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;


    const isExistingEmail = await User.findOne({ where: { email: email } });        //Checks to find if email is in db
    if (isExistingEmail) {
        const err = Error('User already exists');
        err.errors = ["User with that email already exists"];
        err.status = 403;
        next(err);
    }

    const isExistingUsername = await User.findOne({ where: { username: username } });
    if (isExistingUsername) {
        const err = Error('User already exists');
        err.errors = ["User with that username already exists"];
        err.status = 403;
        next(err);
    }

    const user = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);

    return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: token
    });
}
);

module.exports = router;