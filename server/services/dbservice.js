const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017/dent';

class DBService {

    constructor(req, res) {
        this.req = req
        this.res = res
    }

    getClients() {
        let self = this;
        MongoClient.connect(url, function (err, db) {
            db.collection('clients')
                .find()
                .limit(5)
                .toArray()
                .then((users) => {
                    console.log(JSON.stringify(users));
                    return self.res.status(200).json({
                        status: 'success',
                        data: users
                    })
                })
                .catch((err) => {
                    console.log(err);
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
                    console.log(JSON.stringify(users));
                    return self.res.status(200).json({
                        status: 'success',
                        data: users
                    })
                })
                .catch((err) => {
                    console.log(err);
                    return self.res.status(500).json({
                        status: 'error',
                        error: err
                    })
                });
        });
    }

}
module.exports = DBService;