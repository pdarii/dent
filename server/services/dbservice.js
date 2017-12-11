const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017/dent';

class DBService {

    constructor(req, res) {
        this.req = req
        this.res = res
    }


    /*

    ClientsList.insert({name: clientname,
				surname: clientsurname,
				tel:clientphone, 
				comment:clientcomment,
				clientnum: clientnum,
				clientbirthday: jsdate
            });
            
    */

    addClient(client) {
        
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('clients').insert({
                name: client.clientname,
                surname: client.clientsurname,
                tel: client.clientphone,
                comment: client.clientcomment,
                clientnum: client.clientnum,
                clientbirthday: client.jsdate
            }).then((id) => {

                console.log(id);
                
                return self.res.status(200).json({
                    status: 'success',
                    data: id
                })
            }).catch((err) => {
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
            db.collection('clients')
                .find(({ "_id": id }))
                .toArray()
                .then((users) => {
                    return self.res.status(200).json({
                        status: 'success',
                        data: users[0]
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