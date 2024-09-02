const express = require('express');
const router = express.Router();
const { addTenant, getAllTenants } = require('../models/tenant');
const { authenticateToken } = require('../middleware/auth');

router.post('/tenants', authenticateToken, (req, res) => {
    addTenant(req.body, (err, id) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ id });
    });
});

router.get('/tenants', authenticateToken, (req, res) => {
    getAllTenants((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Other CRUD routes...

module.exports = router;
