const express = require('express');
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Rest-API<h1>");
})

const port = 3000;
app.listen(port, () => console.log('Listen the port on ' + port + ' .....'));