const express = require('express');
const app = express();
// const getAllHomes = require('../db/index');

app.use(express.static('./public'));

// app.get('/homes', (req, res) => {
//   getAllHomes((err, docs) => {
//     res.send(JSON.stringify(docs));
//   });
// });

const PORT = process.env.port || 3055;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
