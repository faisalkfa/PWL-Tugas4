const express = require('express');
const mongoose = require('mongoose');
const Users = require('./model/user-model');
const jwt = require('jsonwebtoken');
// const checkAuth = require('./auth');
const app = express();
app.use(express.json());
const {
    getPurchase,
    getPurhcaseBookById,
    createPurchase,
    updatePurchase,
    deletePurchaseById,
    deleteAllPurchase,
} = require('./controller/purchase-book');
const { getUsers, createUser } = require('./controller/user');
// app.use(checkAuth);
const url = 'mongodb://127.0.0.1:27017/';
const database = 'purchaseBooks';

// users login
app.get('/getUsers', getUsers);
app.post('/createUser', createUser);

// jwt token
const secretKey = 'rahasia';
app.post('/login', async (req, res) => {
    try {
        const usernames = req.body.username;
        const passwords = req.body.password;
        const user = {
            name: usernames,
        };
        console.log(usernames, passwords);
        const findUser = await Users.findOne({ username: usernames });
        if (!findUser) {
            throw new Error('error');
        }
        const findPassword = await Users.findOne({ password: passwords });
        if (findPassword) {
            const accessToken = jwt.sign(user, secretKey, {
                expiresIn: '30m',
            });
            res.json({ accessToken: accessToken });
        } else {
            throw new Error('error');
        }
    } catch {
        res.status(500).json({ message: 'failed login, username or password not found' });
    }
});

app.use(authenticateToken);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, secretKey, (err, user) => {
        if (err)
            return res.status(400).json({
                message: 'token invalid',
            });
        req.user = user;
        next();
    });
}

// ***** BOOK PURCHASE *****
app.get('/getPurchase', getPurchase);
app.post('/createPurchase', createPurchase);
app.patch('/updatePurchase/:id', updatePurchase);
app.delete('/deletePurchase/:id', deletePurchaseById);
app.delete('/deleteAllPurchase', deleteAllPurchase);

// ##### database connect #####
mongoose
    .connect(`${url}${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('success! connected to mongoDB');
    })
    .catch((error) => {
        console.error('error connecting to mongoDB', error);
    });

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}..!`);
});
