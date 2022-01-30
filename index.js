const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'welcome to auth!' });
});

app.post('/applications', async (req, res) => {
	try {
		const response = await fetch(
			'https://frontend-test.getsandbox.com/applications',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					cookie: req.body.cookie,
				},
				body: JSON.stringify({
					...req.body,
					id: Math.ceil(Math.random() * 100) + '',
					cookie: undefined,
				}),
			},
		);
		let data = await response.json();
		console.log('response', data);
		if (response.status === 200) {
			return res.json(data);
		} else {
			return res.json({
				message: 'Error comes in creating application',
			});
		}
	} catch (e) {
		console.log('Error', e.response.data);
		return res.json({
			message: 'Error comes in creating application',
		});
	}
});

app.put('/applications/:id', async (req, res) => {
	try {
		const response = await fetch(
			`https://frontend-test.getsandbox.com/applications/${req.params.id}`,
			{
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					cookie: req.body.cookie,
				},
				body: JSON.stringify(req.body),
			},
		);
		let data = await response.json();
		console.log('response', data);
		if (response.status === 200) {
			return res.json(data);
		} else {
			return res.json({
				message: 'Error comes in creating application',
			});
		}
	} catch (e) {
		console.log('Error', e.response.data);
		return res.json({
			message: 'Error comes in creating application',
		});
	}
});

app.delete('/applications/:id', async (req, res) => {
	try {
		const response = await fetch(
			`https://frontend-test.getsandbox.com/applications/${req.params.id}`,
			{
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					cookie: req.body.cookie,
				},
			},
		);
		let data = await response.json();
		console.log('response', data);
		if (response.status === 200) {
			return res.json(data);
		} else {
			return res.json({
				message: 'Error comes in creating application',
			});
		}
	} catch (e) {
		console.log('Error', e.response.data);
		return res.json({
			message: 'Error comes in creating application',
		});
	}
});

app.get('/applications', async (req, res) => {
	try {
		const response = await fetch(
			'https://frontend-test.getsandbox.com/applications',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					cookie: 'sessionId=' + req.query.sessionId,
				},
			},
		);
		let data = await response.json();
		console.log('response', data);
		if (response.status === 200) {
			return res.json(data);
		} else {
			return res.json({
				message: 'Error comes in creating application',
			});
		}
	} catch (e) {
		console.log('Error', e.response.data);
		return res.json({
			message: 'Error comes in creating application',
		});
	}
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log('listening on port', port));
