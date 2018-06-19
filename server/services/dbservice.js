const MongoClient = require('mongodb').MongoClient;

// PROD
const aws = require('aws-sdk');
let s3 = new aws.S3({
  db_link: process.env.db_link,
  db_user: process.env.db_user,
  db_password: process.env.db_password
});

const url = s3.db_link;

// DEV
// const url = 'mongodb://127.0.0.1:27017/dent';


const ObjectId = require('mongodb').ObjectID;

class DBService {

    constructor(req, res) {
        this.req = req
        this.res = res
    }

    addClient(client) {
        let self = this;
        MongoClient.connect(url, function (err, db) {
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
                    surname: client.clientsurname,
                    tel: client.clientphone,
                    comment: client.clientcomment,
                    clientnum: +lastNumber + 1,
                    clientbirthday: new Date(client.clientbirthday)
                }).then((result) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: result.ops[0]
                    })
                }).catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: `Insert error ${err}`
                    })
                });

            }).catch((err) => {
                return self.res.status(500).json({
                    status: 'error',
                    error: `Last number error ${err}`
                })
            });
        });
    }

    planClient(client) {
      let self = this;
      MongoClient.connect(url, function (err, db) {
          db.collection('calendar').insert({
            clientid: ObjectId(client.clientid),
            datetime: client.plandate,
            // jobdone: client.clientjob, @TODO rewrite to use predefined jobs
            jobdone: client.clientcomment,
            doctor: client.doctor,
          }).then((result) => {
            return self.res.status(200).json({
              status: 'success',
              data: result.ops[0]
            })
          }).catch((err) => {
            return self.res.status(500).json({
              status: 'error',
              error: `Insert error ${err}`
            })
          });
      });
    }

    saveClient(client) {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('clients').update({ _id: ObjectId(client._id) },
                {
                    $set: {
                        name: client.clientname,
                        surname: client.clientsurname,
                        tel: client.clientphone,
                        comment: client.clientcomment,
                        clientbirthday: new Date(client.clientbirthday)
                    }
                })
                .then((result) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: result
                    })
                }).catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: `Insert error ${err}`
                    })
                });
        });
    }

    deleteClient(id) {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('clients').remove({ _id: ObjectId(id) }, true)
                .then((result) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: result
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });

    }

    getClientsCount() {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('clients').count()
                .then((num) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: num
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    getBirthdaysCount() {
      const self = this;
      const d = new Date();

      const month = d.getMonth();
      const day = d.getDate();

      MongoClient.connect(url, function (err, db) {
        db.collection('clients')
          .find({})
          .toArray()
          .then((num) => {
            return self.res.status(200).json({
              status: 'success',
              data: num
            })
          })
          .catch((err) => {
            return self.res.status(500).json({
              status: 'error',
              error: err
            })
          });
      });
    }

    getClients() {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('clients')
                .find()
                .sort({ $natural: -1 })
                .limit(10)
                .toArray()
                .then((users) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: users
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    getDoctors() {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('doctors')
                .find()
                .sort({ $natural: -1 })
                .toArray()
                .then((doctors) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: doctors
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    getJobs() {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('jobsList')
                .find()
                .sort({ $natural: -1 })
                .toArray()
                .then((jobs) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: jobs
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    getTimelineEvents(id) {
        let self = this;

        MongoClient.connect(url, function (err, db) {
            db.collection('calendar')
                .find({ "clientid": ObjectId(id) })
                .sort({ $natural: -1 })
                .toArray()
                .then((events) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: events
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    getCalendarData() {
        let self = this;
        let d = new Date();
        // @TODO зміни на 1 місяць
        d.setMonth(d.getMonth() - 2);

        MongoClient.connect(url, function (err, db) {
        // @TODO REWRITE THIS AS FAST AS YOU CAN
          db.collection('calendar').aggregate([
            {
              $lookup:
                {
                  from: "clients",
                  localField: "clientid",
                  foreignField: "_id",
                  as: "client"
                }
            }
          ]) .toArray()
              .then((events) => {
                return self.res.status(200).json({
                              status: 'success',
                              data: events
                          })
              })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    getClientById(id) {
        let self = this;

        if (id === 'new') {
            return self.res.status(200).json({
                status: 'success',
                data: ''
            })
        }

        MongoClient.connect(url, function (err, db) {
            db.collection('clients').findOne({ "_id": ObjectId(id) }, {})
                .then((client) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: client
                    })

                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    searchClient(name) {
        let self = this;
        MongoClient.connect(url, function (err, db) {
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
                    return self.res.status(200).json({
                        status: 'success',
                        data: users
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

    getStatistic(period) {
      let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('calendar')
                .find({ datetime: { $gt: new Date(period.value), $lt: new Date() }})
                .toArray()
                .then((users) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: users
                    })
                })
                .catch((err) => {
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

}
module.exports = DBService;
