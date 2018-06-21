// PROD ENV

// const express = require('express')
// const DBService = require('./services/dbservice')
// const path = require('path')
// const bodyParser = require('body-parser')
// const app = express()
//
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(__dirname + './../dist'));
//




const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const path = require('path')

const CLIENTS_COLLECTION = "clients";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// Create link to Angular build directory
var distDir = __dirname + "./../dist";
app.use(express.static(distDir));




// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

const db_link = process.env.db_link || 'mongodb://test:test@127.0.0.1:27017/dent';

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(db_link, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  const port = 8080;
  // const port = 3000;

  // Initialize the app.
  const server = app.listen(process.env.PORT || port, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});



// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get('/api/getClientsCount', function (req, res) {
  console.log('-------------------');
  console.log('getClientsCount');

    db.collection(CLIENTS_COLLECTION).count()
      .then((num) => {

        console.log(num);
        console.log('-------------------');

        return res.status(200).json({
          status: 'success',
          data: num
        })
      })
      .catch((err) => {
        //     handleError(res, err.message, "Failed to get clients count.");
        return res.status(500).json({
          status: 'error',
          error: err
        })
      });
})

app.get('/*', function(req,res) {
  console.log('++++++++++++');
  console.log(req.originalUrl);
  console.log('++++++++++++');
  res.sendFile(path.join(__dirname+'./../dist/index.html'));
});






//
//
// // DB Service Calls - @TODO rewrite this
// app.post('/api/deleteClient',function(req,res){
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.deleteClient(req.body.id);
// });
//
// app.post('/api/addClient', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.addClient(req.body);
// })
//
// app.post('/api/planClient', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.planClient(req.body);
// })
//
// app.post('/api/saveClient', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.saveClient(req.body);
// })
//
// app.get('/api/getClients', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.getClients();
// })
//
// app.get('/api/getDoctors', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.getDoctors();
// })
//
// app.get('/api/getBirthdaysCount', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.getBirthdaysCount();
// })
//
// app.get('/api/getCalendarData', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.getCalendarData();
// })
//
// app.get('/api/getClientsCount', function (req, res) {
//   console.log('-------------------');
//   console.log('getClientsCount');
//   console.log('-------------------');
//
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.getClientsCount();
// })
//
// app.get('/api/getClientById/:id', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   const id = req.params.id;
//   clientsServiceObj.getClientById(id);
// })
//
// app.get('/api/searchClient/:name', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   const name = req.params.name;
//   clientsServiceObj.searchClient(name);
// })
//
// app.post('/api/getStatistic/', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.getStatistic(req.body);
// })
//
// app.get('/api/getJobs', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   clientsServiceObj.getJobs();
// })
//
// app.get('/api/getTimelineEvents/:id', function (req, res) {
//   const clientsServiceObj = new DBService(req, res)
//   const id = req.params.id;
//   clientsServiceObj.getTimelineEvents(id);
// })

// END DB Service Calls - @TODO rewrite this






// app.get('/*', function(req,res) {
//   console.log('-------------------');
//   console.log(req.originalUrl);
//   console.log('-------------------');
//   res.sendFile(path.join(__dirname+'./../dist/index.html'));
// });
//
//
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//
// const port = process.env.PORT || '8080';
// // const port = '3000';
//
// app.set('port', port);
//
// const server = http.createServer(app);
// server.listen(port, ()=>console.log('DB service listening on port ', port))

// app.listen(port, function () {
//   console.log('DB service listening on port ', port);
// })




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



