const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.unsubscribe(bodyParser.json());

app.listen(port, () => {
	console.log(`server is one ${port}`);
});
