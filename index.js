const express = require('express');
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Rest-API<h1>");
})

const customers = [ 
    { "id": 1, "name": "Saman", "phone": "0714528777", "age": 25 }, 
    { "id": 2, "name": "Josh", "phone": "0778545874", "age": 30 }, 
    { "id": 3, "name": "Kamal", "phone": "0714524877", "age": 41 }, 
    { "id": 4, "name": "Nihal", "phone": "0714524877", "age": 35 } 
]

// get customer list 
app.get('/api/customers', (req, res) => {
    res.send(customers);
})

// get customer by id
app.get('/api/customers/:id', (req, res) => {
    const filterCustomer = customers.find((c) => c.id == parseInt(req.params.id));

    if(filterCustomer){
        res.status(200).send(filterCustomer);
    } else {
        res.status(404).send("<h2> Customer is not in the list <h2>");
    }
})

const port = 3000;
app.listen(port, () => console.log('Listen the port on ' + port + ' .....'));