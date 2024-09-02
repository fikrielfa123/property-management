const express = require('express');
const router = express.Router();
const { addPayment, getAllPayments } = require('../models/payment');
const { authenticateToken } = require('../middleware/auth');

router.post('/payments', authenticateToken, (req, res) => {
    addPayment(req.body, (err, id) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ id });
    });
});

router.get('/payments', authenticateToken, (req, res) => {
    getAllPayments((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Other CRUD routes...

module.exports = router;
