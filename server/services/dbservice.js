const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017/dent';
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
                    clientbirthday: client.clientbirthday
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

    getClientById(id) {
        let self = this;
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
                { sort: { surname: 1, name: 1 }, limit: 10 })
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

    getStatistic() {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('calendar')
                .find()
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