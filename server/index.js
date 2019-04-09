const express = require('express');
const app = express();

app.use(express.static('./public'));

const PORT = process.env.port || 3055;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
