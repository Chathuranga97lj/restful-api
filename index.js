const express = require('express');
const app = express();
app.use(express.json());
const Joi = require('joi');

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Rest-API</h1>");
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
        res.status(404).send("<h2> Customer is not in the list </h2>");
    }
})

// get customer filtering age
app.get('/api/eligible_customers/:age', (req, res) => {
    const eligiCustomer = customers.find((c) => c.age > parseInt(req.params.age));

    if(eligiCustomer){
        res.status(200).send(eligiCustomer);
    } else {
        res.status(404).send('There are no eligibal customer in the list');
    }
})

// add customer
app.post('/api/add_customer', (req, res) => {
    const {error} = validateCustomer(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);       
    }

    const newCustomer = {
        id: customers.length + 1, // increse customer id
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age
    };

    customers.push(newCustomer);
    res.send(newCustomer);
})

// data validation
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3),
        phone: Joi.string(),
        age: Joi.number()
    });

    return schema.validate(customer);
}

// update customer
app.put('/api/update_customer/:id', (req, res) => {
    const customer = customers.find((c) => c.id == parseInt(req.params.id));

    if(!customer){
        res.status(404).send('<h2> Customer is not funded related to id: '+ req.params.id + ' </h2>');
    }

    const {error} = validateCustomer(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);       
    }

    if(req.body.name){
        customer.name = req.body.name;
    }

    if(req.body.phone){
        customer.phone = req.body.phone;
    }

    if(req.body.age){
        customer.age = req.body.age;
    }

    res.send(customer);

});

// delete users
app.delete('/api/delete_customer/:id', (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.body.id));

    res.send({
        "statusCode": 404,
        "error": 'Oppz customer is not found for id: '+req.params.id
    });

    const index = customers.indexOf(customer);
    res.send("Customer "+customer.name+" is removed!");
    customers.splice(index, 1);
    

})

const port = 3000;
app.listen(port, () => console.log('Listen the port on ' + port + ' .....'));