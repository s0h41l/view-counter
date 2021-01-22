const express  = require('express');
const app = express();
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/main');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Request-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/', mainRoutes);


// Error handler
app.use(function (err, req, res, next) {
    const code = err.statusCode || 500;
    const message = err.message;
    res.status(code).send(message);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started.");
})