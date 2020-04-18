const userService = require('../services/app.users.service');

function authenticate(req, res, next) {
    console.log(req.body);
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// function Otpsent(req, res, next) {
//     userService.Otpsent(req.body.mobileNumber)
//         .then(() => res.json(res.body))
//         .catch(err => next(err));
// }

// function otpVerification(req, res, next) {
//     userService.otpVerification(req.body.id, req.body.otp)
//         .then(() => res.json({ message: 'Verification done Successfully.' }))
//         .catch(err => next(err));
// }


module.exports = {
    authenticate,
    register,
    getAll,
    getById,
    //otpVerification,
    //Otpsent,
    _delete,
    update,
    getCurrent
}