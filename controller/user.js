const users = require('../model/user-model');

exports.createUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const newUser = await users.create({
            username: username,
            password: password,
        });
        res.status(201).json({
            status: 'create success',
            books: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    }
};
exports.getUsers = async (req, res) => {
    try {
        const user = await users.find();
        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            data: {
                users: user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed request',
            message: err,
        });
    }
};
