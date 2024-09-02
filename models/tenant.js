const db = require('./database');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tenants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        contact_details TEXT,
        property_id INTEGER,
        section TEXT,
        FOREIGN KEY (property_id) REFERENCES properties(id)
    )`);
});

const addTenant = (tenant, callback) => {
    const { name, contact_details, property_id, section } = tenant;
    db.run(`INSERT INTO tenants (name, contact_details, property_id, section) VALUES (?, ?, ?, ?)`,
        [name, contact_details, property_id, section], function (err) {
            callback(err, this.lastID);
        });
};

const getAllTenants = (callback) => {
    db.all(`SELECT * FROM tenants`, [], (err, rows) => {
        callback(err, rows);
    });
};

// Other CRUD methods...

module.exports = { addTenant, getAllTenants };
