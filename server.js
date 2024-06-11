const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

db.serialize(() => {
    db.run("CREATE TABLE expenses (id INTEGER PRIMARY KEY, category TEXT, description TEXT, amount REAL)");
});

app.post('/api/expenses', (req, res) => {
    const { category, description, amount } = req.body;
    const stmt = db.prepare("INSERT INTO expenses (category, description, amount) VALUES (?, ?, ?)");
    stmt.run(category, description, amount, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id: this.lastID, category, description, amount });
    });
    stmt.finalize();
});

app.get('/api/expenses', (req, res) => {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
