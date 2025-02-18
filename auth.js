const express = require('express');
const bcrypt = require('bcrypt'); // Use bcryptjs instead of bcrypt
const db = require('./db');

const router = express.Router(); // Corrected usage of router

// Register user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Fix variable name

        // Insert user into the database
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error registering user');
            }
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare the hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

module.exports = router; // Export router correctly
