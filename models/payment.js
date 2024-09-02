const db = require('./database');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tenant_id INTEGER,
        amount REAL,
        date TEXT,
        status TEXT,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    )`);
});

const addPayment = (payment, callback) => {
    const { tenant_id, amount, date, status } = payment;
    db.run(`INSERT INTO payments (tenant_id, amount, date, status) VALUES (?, ?, ?, ?)`,
        [tenant_id, amount, date, status], function (err) {
            callback(err, this.lastID);
        });
};

const getAllPayments = (callback) => {
    db.all(`SELECT * FROM payments`, [], (err, rows) => {
        callback(err, rows);
    });
};

// Other CRUD methods...

module.exports = { addPayment, getAllPayments };
