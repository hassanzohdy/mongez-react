const { app, serve, post } = require('./server');
const createAdminModule = require('./createAdminModule');
const createFrontOfficeModule = require('./createFrontOfficeModule');
const settings = require('./wizard-settings');

const port = 2311;

app.get('/settings', function (req, res) {
    res.send(settings);
});

post('/create-admin-module', createAdminModule);
post('/create-front-office-module', createFrontOfficeModule);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/wizard-ui/index.html');
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/wizard-ui' + req.path);
});

module.exports = function () {
    serve(port);
};