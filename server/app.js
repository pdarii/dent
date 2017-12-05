const express = require('express')
const DBService = require('./services/dbservice')
const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/getClients', function (req, res) {
  let clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getClients()
})

app.get('/api/getStatistic', function (req, res) {
  let clientsServiceObj = new DBService(req, res)
  clientsServiceObj.getStatistic()
})




app.listen(3000, function () {
  console.log('DB service listening on port 3000!')
})

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



