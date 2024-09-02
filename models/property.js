const db = require('./database');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        address TEXT,
        type TEXT,
        number_of_units INTEGER,
        rental_cost REAL
    )`);
});

const addProperty = (property, callback) => {
    const { name, address, type, number_of_units, rental_cost } = property;
    db.run(`INSERT INTO properties (name, address, type, number_of_units, rental_cost) VALUES (?, ?, ?, ?, ?)`,
        [name, address, type, number_of_units, rental_cost], function (err) {
            callback(err, this.lastID);
        });
};

const getAllProperties = (callback) => {
    db.all(`SELECT * FROM properties`, [], (err, rows) => {
        callback(err, rows);
    });
};

// Other CRUD methods...

module.exports = { addProperty, getAllProperties };
