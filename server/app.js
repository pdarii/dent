// PROD ENV

const express = require('express')
const DBService = require('./services/dbservice')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + './../dist'));





// DB Service Calls - @TODO rewrite this
app.post('/api/deleteClient',function(req,res){
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.deleteClient(req.body.id);
});

app.post('/api/addClient', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.addClient(req.body);
})

app.post('/api/planClient', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.planClient(req.body);
})

app.post('/api/saveClient', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.saveClient(req.body);
})

app.get('/api/getClients', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getClients();
})

app.get('/api/getDoctors', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getDoctors();
})

app.get('/api/getBirthdaysCount', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getBirthdaysCount();
})

app.get('/api/getCalendarData', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getCalendarData();
})

app.get('/api/getClientsCount', function (req, res) {
  console.log('-------------------');
  console.log('getClientsCount');
  console.log('-------------------');

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

app.post('/api/getStatistic/', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getStatistic(req.body);
})

app.get('/api/getJobs', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getJobs();
})

app.get('/api/getTimelineEvents/:id', function (req, res) {
  const clientsServiceObj = new DBService(req, res)
  const id = req.params.id;
  clientsServiceObj.getTimelineEvents(id);
})

// END DB Service Calls - @TODO rewrite this






app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'./../dist/index.html'));
});


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || '8080';
// const port = '3000';

app.listen(port, function () {
  console.log('DB service listening on port ', port);
})




// DEV ENV

// const express = require('express')
// const DBService = require('./services/dbservice')
// const app = express()
//
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
//
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//
// app.listen(3000, function () {
//   console.log('DB service listening on port 3000!')
// })



