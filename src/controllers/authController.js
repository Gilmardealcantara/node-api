const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });

}

/*
{
	"name": "gilmar",
	"email": "gilnar@teste.com",
	"password": "1234"
}
*/

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ 'error': 'User already exists' });
        }
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ user, token: generateToken({id: user.id},) });
    } catch{
        return res.status(400).send({ 'error': 'Registrations failde' });
    }
})


/*
{
	"email": "gilnar@teste.com",
	"password": "1234"
}
*/

router.post('/autenticate', async (req, res) => {
    const { email, password } = req.body;
    if(email == undefined || password == undefined) 
        return res.status(400).send({ 'error': 'Invalide model' });

    const user = await User.findOne({ email }).select('+password ');
    if (!user)
        return res.status(400).send({ 'error': 'User not Found' });
    if (! await bcrypt.compare(password, user.password))
        return res.status(400).send({ 'error': 'Invalid password' });
    
    user.password = undefined;

    return res.send({ user, token: generateToken({id: user.id}) });

})
module.exports = app => app.use('/auth', router);
