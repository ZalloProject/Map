const express = require('express');
const app = express();
const cors = require('cors');
// const getAllHomes = require('../db/index');

app.use(express.static('./public'));
app.use(cors());

const PORT = process.env.port || 3055;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
