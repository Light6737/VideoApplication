const db = require('../config/db');

class User {
    static create(newUser, result) {
        db.query('INSERT INTO users SET ?', newUser, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newUser });
        });
    }

    static findByUsername(username, result) {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res[0]);
        });
    }
}

module.exports = User;
