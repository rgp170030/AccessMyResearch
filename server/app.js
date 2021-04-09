const express = require("express");

const app = express();
const port = 3000;

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
	node:
		"https://search-accessmyresearch-rxbdfxn7frebom3di4du5ld464.us-east-2.es.amazonaws.com",
	auth: {
		username: "amr",
		password: "Amr123!!",
	},
});

console.log("Starting node server");

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.get("/search-es", (req, res) => {
  const titleQuery = req.query.title;
  console.log("Query title: " + titleQuery);


	client
		.search({
			index: "articles",
			body: {
				query: {
					match: {
						title: titleQuery,
					},
				},
			},
		})
		.then((results) => {
			// console.dir(results);
			res.send(results.body.hits.hits);
		})
		.catch((err) => {
			console.log(err);
			res.send([]);
		});
});



app.get("/health", (req, res) => {
	console.log("It is healthy");
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
