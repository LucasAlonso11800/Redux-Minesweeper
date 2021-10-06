import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import faker from 'faker';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.dbHost,
    database: process.env.dbDatabase,
    user: process.env.dbUser,
    password: process.env.dbPassword
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL')
});

app.get('/scores/:id', (req, res) => {
    const query = `
        SELECT 
            score_id AS id,
            level_id AS level,
            username AS user,
            time
        FROM scores 
        WHERE level_id = ${req.params.id}
        ORDER BY time
        LIMIT 100`;
   
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

app.post('/scores', (req, res) => {
    const { level_id, username, time } = req.body;

    const query = `
        INSERT INTO scores (level_id, username, time)
        VALUES (${level_id}, "${username}", ${time})
    `;

    connection.query(query, (err) => {
        if(err) throw err;
        res.json('Score added')
    })
});

app.post('/populateDB', (req, res) => {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 100; j++) {
            const query = `
                INSERT INTO scores (level_id, username, time)
                VALUES (${i}, "${faker.name.firstName()}", ${Math.floor(Math.random() * 100 + 10)})
            `
            connection.query(query, (err) => {
                if(err) throw err
            });
        }
    }
    res.json('Everything is working');
});

const PORT = 5002 || process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));