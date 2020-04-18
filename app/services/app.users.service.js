const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbUtils = require('../../config/dbUtils');
const User=dbUtils.User;


async function authenticate({ username, password }) {
    const user = await User.findOne({ username: username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    } 
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    const user = new User(userParam);
    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    // save user
    console.log(user.password);
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }
    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

// async function Otpsent(mobileNumber) {
//     messagebird.verify.create(mobileNumber, {
//         originator: '+917906350080',
//         template: 'Your verification code is %token.'
//     }, function (err, response) {
//         if (err) {
//             console.log(err);
//             throw 'Otp did not send.';
//             // res.render('step1', {
//             //     error : err.errors[0].description
//             // });
//         } else {
//             console.log(response);
//             // res.render('step2', {
//             var responseId = response.id;
//             return responseId;
//             // });
//         }
//     })
// }

// async function otpVerification(id, otp) {
//     messagebird.verify.verify(id, otp, function (err, response) {
//         if (err) {
//             console.log(err);
//             throw 'Invalid Otp !';
//             // res.render('step2', {
//             //     error: err.errors[0].description,
//             //     id : id
//             // });
//         } else {
//             console.log(response);
//             // res.render('step3');
//         }
//     })
// }

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};