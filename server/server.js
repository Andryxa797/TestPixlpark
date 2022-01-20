const express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json({}));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') res.send();
    else {
        const targetURL = req.header('Target-URL');
        if (!targetURL) {
            res.send({error: 'There is no Target-Endpoint header in the request'});
            return;
        }
        request({
                url: targetURL + req.url,
                method: req.method,
                json: req.body,
                headers: {'Authorization': req.header('Authorization')}
            },
            function (error, response, body) {
                if (error) console.error('error: ' + response.statusCode)
            }).pipe(res);
    }
});
app.set('port', 3001);
app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});

