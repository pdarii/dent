const express = require('express')
const DBService = require('./services/dbservice')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, function () {
  console.log('DB service listening on port 3000!')
})

app.post('/api/deleteClient',function(req,res){
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.deleteClient(req.body.id);
});

app.post('/api/addClient', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  const client = req.params;
  clientsServiceObj.addClient(req.body);
})

app.post('/api/saveClient', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  const client = req.params;
  clientsServiceObj.saveClient(req.body);
})

app.get('/api/getClients', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getClients();
})

app.get('/api/getClientsCount', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getClientsCount();
})

app.get('/api/getClientById/:id', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  const id = req.params.id;
  clientsServiceObj.getClientById(id);
})

app.get('/api/searchClient/:name', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  const name = req.params.name;
  clientsServiceObj.searchClient(name);
})

app.get('/api/getStatistic', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getStatistic();
})








