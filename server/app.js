// PROD ENV

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;
const path = require('path')

const CLIENTS_COLLECTION = "clients";

const app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
var authCheck = jwt({
  secret: new Buffer('j52jWgs3VjnajLaBvaN6xDNJvL9gf1X9vwhDPDnEK9tuDdYvVsvqUm59xgeNNljR', 'base64'),
  audience: 'Adpvbg_TwPETm23za7gvj7jSO0PXkb-w'
});


const isLocal = process.env.db_link ? false : true;

if(isLocal) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

if(!isLocal) {
  // Create link to Angular build directory
  const distDir = __dirname + "./../dist";
  app.use(express.static(distDir));
}


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



  const port = isLocal ? 3000 : 8080;

  // Initialize the app.
  const server = app.listen(process.env.PORT || port, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
// handleError(res, err.message, "Failed to get clients count.");


// CONTACTS API ROUTES BELOW

app.get('/api/getClientsCount', function (req, res) {
    db.collection(CLIENTS_COLLECTION).count()
      .then((num) => {
        return res.status(200).json({
          status: 'success',
          data: num
        })
      })
      .catch((err) => {
        return res.status(500).json({
          status: 'error',
          error: err
        })
      });
})

app.post('/api/deleteClient',function(req,res){
  const id = req.body.id;
  db.collection('clients').remove({ _id: ObjectId(id) }, true)
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});

app.post('/api/deleteEvent',function(req,res){
  const id = req.body.id;
  db.collection('calendar').remove({ _id: ObjectId(id) }, true)
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});


app.post('/api/addClient', function (req, res) {
  const client = req.body;
  db.collection('clients').findOne({}, { sort: { clientnum: -1 } }
  ).then((result) => {
    let lastNumber;
    if (result) {
      lastNumber = (!result.clientnum) ? 0 : result.clientnum;
    } else {
      lastNumber = 0;
    };

    db.collection('clients').insert({
      name: client.clientname,
      father: client.clientfather,
      surname: client.clientsurname,
      tel: client.clientphone,
      comment: client.clientcomment,
      clientnum: +lastNumber + 1,
      clientbirthday: new Date(client.clientbirthday)
    }).then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result.ops[0]
      })
    }).catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: `Insert error ${err}`
      })
    });

  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      error: `Last number error ${err}`
    })
  });
});


app.post('/api/planClient', function (req, res) {
  const client = req.body;
  db.collection('calendar').insert({
    clientid: client.clientid ? ObjectId(client.clientid) : '',
    datetime: client.plandate,
    jobtype: client.clientjob,
    jobdone: client.clientcomment,
    doctor: client.doctor,
    tel: client.clientphone
  }).then((result) => {
    return res.status(200).json({
      status: 'success',
      data: result.ops[0]
    })
  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      error: `Insert error ${err}`
    })
  });
});

app.post('/api/editPlanClient', function (req, res) {
  const event = req.body;
  db.collection('calendar').update(
    {_id:ObjectId(event._id)},
    { $set : {
        datetime: event.datetime,
        jobtype: event.jobtype,
        jobdone: event.jobdone,
        doctor: event.doctor,
    }}).then((result) => {
      return res.status(200).json({
        status: 'success',
        data: event.clientid
      })
    }).catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: `Update error ${err}`
      })
    });
});


app.post('/api/saveClient', function (req, res) {
  const client = req.body;
  db.collection('clients').update({ _id: ObjectId(client._id) },
    {
      $set: {
        name: client.clientname,
        father: client.clientfather,
        surname: client.clientsurname,
        tel: client.clientphone,
        comment: client.clientcomment,
        clientbirthday: new Date(client.clientbirthday)
      }
    })
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      error: `Insert error ${err}`
    })
  });

});

app.get('/api/getClients', function (req, res) {
  db.collection('clients')
    .find()
    .sort({ $natural: -1 })
    .limit(10)
    .toArray()
    .then((users) => {
      return res.status(200).json({
        status: 'success',
        data: users
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});

app.get('/api/getDoctors', function (req, res) {
  db.collection('doctors')
    .find()
    .sort({ $natural: -1 })
    .toArray()
    .then((doctors) => {
      return res.status(200).json({
        status: 'success',
        data: doctors
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});

app.get('/api/getBirthdaysCount', function (req, res) {
  // @TODO
  const d = new Date();

  const month = d.getMonth();
  const day = d.getDate();

  db.collection('clients')
    .find({})
    .toArray()
    .then((num) => {
      return res.status(200).json({
        status: 'success',
        data: num
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });

});


app.get('/api/getCalendarData', function (req, res) {
  let d = new Date();
  // @TODO зміни на 1 місяць
  d.setMonth(d.getMonth() - 2);

  // @TODO REWRITE THIS AS FAST AS YOU CAN
  db.collection('calendar').aggregate([
    {
      $lookup:
        {
          from: CLIENTS_COLLECTION,
          localField: "clientid",
          foreignField: "_id",
          as: "client"
        }
    }
  ]) .toArray()
    .then((events) => {
      return res.status(200).json({
        status: 'success',
        data: events
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});

app.get('/api/getClientById/:id', function (req, res) {
  const id = req.params.id;
  if (id === 'new') {
    return res.status(200).json({
      status: 'success',
      data: ''
    })
  }
  db.collection('clients').findOne({ "_id": ObjectId(id) }, {})
    .then((client) => {
      return res.status(200).json({
        status: 'success',
        data: client
      })

    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});


app.get('/api/searchClient/:name', function (req, res) {
  const name = req.params.name;

  db.collection('clients')
    .find({
        $or: [
          { "surname": { '$regex': name, '$options': 'i' } },
          { "name": { '$regex': name, '$options': 'i' } },
          { "tel": { '$regex': name, '$options': 'i' } }]
      },
      { sort: { surname: 1, name: 1 }, limit: 500 })
    .toArray()
    .then((users) => {
      return res.status(200).json({
        status: 'success',
        data: users
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });

});


app.post('/api/getStatistic/', function (req, res) {
  const period = req.body;
  db.collection('calendar')
    .find({ datetime: { $gt: new Date(period.value), $lt: new Date() }})
    .toArray()
    .then((users) => {
      return res.status(200).json({
        status: 'success',
        data: users
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});


app.get('/api/getJobs', function (req, res) {
  db.collection('jobsList')
    .find()
    .sort({ $natural: -1 })
    .toArray()
    .then((jobs) => {
      return res.status(200).json({
        status: 'success',
        data: jobs
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});


app.get('/api/getTimelineEvents/:id', function (req, res) {
  const id = req.params.id;
  db.collection('calendar')
    .find({ "clientid": ObjectId(id) })
    .sort({ $natural: -1 })
    .toArray()
    .then((events) => {
      return res.status(200).json({
        status: 'success',
        data: events
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});

app.get('/api/getTimelineEventById/:id', function (req, res) {
  const id = req.params.id;
  db.collection('calendar').findOne({ "_id": ObjectId(id) }, {})
    .then((client) => {
      return res.status(200).json({
        status: 'success',
        data: client
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        error: err
      })
    });
});


if(!isLocal) {
  app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'./../dist'));
  });
}



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



