const config = require('config');
const express = require('express');
const cors = require('./module/cors');
const morgan = require('morgan');


const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./src/doc/swagger.yaml');


const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(express.json());

app.use('/student', require('./controllers/student/student.routes'));
// app.use('/school', (req, res, next) => res.json([]));
app.use('/school', require('./controllers/school/school.routes'));
// app.use('/classroom', (req, res, next) => res.json([]));
app.use('/classroom', require('./controllers/classroom/classroom.routes'));
// app.use('/building', (req, res, next) => res.json([]))
app.use('/building', require('./controllers/building/building.routes'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((err, req, res, next) => {
    const status = err.statusCode ? err.statusCode : 500;
    res.status(status);
    res.json({
        hasError: true,
        message: err.message
    })
})

module.exports = app;
