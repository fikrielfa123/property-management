const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const propertyRoutes = require('./routes/property');
const tenantRoutes = require('./routes/tenant');
const paymentRoutes = require('./routes/payment');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());

const users = []; // In-memory user storage for simplicity

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Property Management API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Adjust to match your structure
})));
// In server.js

app.get('/', (req, res) => {
    res.send('Welcome to the Property Management Application');
});

app.use('/api', propertyRoutes);
app.use('/api', tenantRoutes);
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
