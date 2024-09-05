const db = require('../config/db');

class Videodb {
    static create(newVideo, result) {
        db.query('INSERT INTO videos SET ?', newVideo, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newVideo });
        });
    }

    static getAllByUserId(userId, result) {
        db.query('SELECT * FROM videos WHERE user_id = ?', [userId], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
    }
}

module.exports = Videodb;
