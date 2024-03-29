const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const {authenticate, secretKey } = require('../../middleware/Auth');

//Handling authentication requests

//Register a new user
router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Account Created! ' });

        //Trying to auto-log you in
        if(user) {
            console.log('found user!');
            const token = jwt.sign({ userId: user._id }, secretKey, {
                expiresIn: '1 hour'
            });
            //Getting the username and the token 
            res.json({ token, username });
        }
    } catch (error) {
        next(error);
    }
});

//Login with an existing user
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
        try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User Found: ', user);

        const passwordMatch = await user.comparePassword(password);
        console.log('Password Match: ', passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        
        //Saving the userid as userId to be used later
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1 hour'
        });
        //Getting the username and the token 
        res.json({ token, username: user.username });

    } catch (error) {
        next(error);
    }
});

//Middleware to ensure authenticated access
router.use(authenticate);

module.exports = router;