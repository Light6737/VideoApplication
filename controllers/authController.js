const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

// Registration function
exports.register = (req, res) => {
    console.log('Register route hit'); 

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter both username and password' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ msg: 'Error hashing password' });
        }

      
        const newUser = { username, password: hash };

        
        User.create(newUser, (err, user) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ msg: 'Error creating user' });
            }

            
            const payload = { user: { id: user.id } };

            
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.error('Error signing JWT:', err);
                    return res.status(500).json({ msg: 'Error signing JWT' });
                }

                res.json({ token });
            });
        });
    });
};


exports.login = (req, res) => {
    console.log('Login route hit'); 

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter both username and password' });
    }

    
    User.findByUsername(username, (err, user) => {
        if (err || !user) {
            console.error('Invalid credentials or error finding user');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const payload = { user: { id: user.id } };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.error('Error signing JWT:', err);
                    return res.status(500).json({ msg: 'Error signing JWT' });
                }

                res.json({ token });
            });
        });
    });
};
