const express = require('express');

const app = express();

app.use(express.static('./dist/radars-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/radars-app/'}),
);

app.listen(process.env.PORT || 8080);
