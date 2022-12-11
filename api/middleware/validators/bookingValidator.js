const {check, validationResult} = require('express-validator');

exports.validateUser = [
    check('user_id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User ID can not be empty!')
        .bail(),
    check('spot_id')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Spot ID can not be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];