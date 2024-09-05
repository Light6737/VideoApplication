const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const dotenv = require('dotenv');
const db = require('../config/db'); 

dotenv.config(); 
const router = express.Router();


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

       
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

       
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});


const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;  
        next();  
    } catch (err) {
        console.error('JWT verification failed:', err);
        res.status(401).json({ msg: 'Invalid token, authorization denied' });
    }
};


module.exports = {
    router,  
    auth,   
};
