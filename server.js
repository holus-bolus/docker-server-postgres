const express = require('express');
const pool = require('./db');
const port = 1337;

const app = express();

app.use(express.json())

app.get('/', async (req, res) => {
	try {
		const data = await pool.query('SELECT * FROM schools');
		res.status(200).send(data.rows);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
})

app.post('/', async (req, res) => {
	const {name, location} = req.body;
	try {
		await pool.query('INSERT INTO schools (name, address) VALUES($1,$2)', [name, location]);
		res.status(200).send({message: 'The child has been successfully created'});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
})

app.get('/setup', async (req, res) => {
	try {
		await pool.query('CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))');
		res.status(200).send({message: 'Successfully created the table'});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
})

app.listen(port, () => {
	console.log(`The server has started on the ${port} port`)
});