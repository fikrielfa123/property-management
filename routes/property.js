const express = require('express');
const router = express.Router();
const { addProperty, getAllProperties } = require('../models/property');
const { authenticateToken } = require('../middleware/auth');

router.post('/properties', authenticateToken, (req, res) => {
    addProperty(req.body, (err, id) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ id });
    });
});

router.get('/properties', authenticateToken, (req, res) => {
    getAllProperties((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Other CRUD routes...

module.exports = router;
