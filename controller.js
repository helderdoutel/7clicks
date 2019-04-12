var Controller = {
    app: null,
    model: null,
    path: require('path')
}

Controller.init = function (app, model) {
    Controller.app = app;
    Controller.model = model;

    Controller.app.get(['/', '/index', '/home'], function(req, res){
        res.sendFile(Controller.path.join(__dirname + '/views/index.html'));
    });

    Controller.app.get('*', function(req, res){
        res.status(404).send('what???');
    });
}

module.exports = Controller;
