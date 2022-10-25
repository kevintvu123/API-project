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
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username is required'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    handleValidationErrors
];

// Sign up w/ validateSignup middleware
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;


    const isExistingEmail = await User.findOne({ where: { email: email } });        //Attempts to find if email is in db
    if (isExistingEmail) {
        const err = Error('User already exists');
        err.errors = { email: "User with that email already exists" };
        err.status = 403;
        next(err);
    }

    const isExistingUsername = await User.findOne({ where: { username: username } });
    if (isExistingUsername) {
        const err = Error('User already exists');
        err.errors = { username: "User with that username already exists" };
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