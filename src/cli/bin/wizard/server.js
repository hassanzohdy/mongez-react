const open = require('open');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { default: Is } = require('@flk/supportive-is');

const changify = (object, criteria, change) => {

    for (let key in object) {
        let value = object[key];

        if (!value) continue;

        if (Is.object(value)) {
            changify(value, criteria, change);
        } else if (Is.array(value)) {
            for (let i = 0; i < value.length; i++) {
                let valueInArray = value[i];

                if (Is.plainObject(valueInArray)) {
                    changify(valueInArray, criteria, change);
                } else if (criteria(valueInArray) === true) {
                    value[i] = change(valueInArray);
                }
            }
        } else if (criteria(value) === true) {
            object[key] = change(value);
        }
    }
}

const boolify = object => {
    return changify(object, value => ['true', 'false'].includes(value), value => value === 'true');
}

const numberify = object => {
    return changify(object, value => Is.numeric(value), value => Number(value));
}

const post = (route, callback) => {
    return app.post(route, multer().any(), (req, res, next) => {
        if (req.body) {
            boolify(req.body);
            numberify(req.body);
        }

        callback(req, res, next);
    });
};

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const serve = function (port) {
    const url = `http://localhost:${port}`;

    app.listen(port, () => {
        console.log(`Mongez module builder is serving at ${url}`);
    });

    let openOptions = {};

    open(url, openOptions);
};

module.exports = { app, serve, post };