require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { formulaSchema, rawMaterialSchema } = require('./squemas.js');
const routes = require('./routes');

app.use(express.urlencoded({ extended: false }));

// mongodb and mongoose
mongoose.connect(process.env.MONGO_URI);
const formulaModel = new mongoose.model('formula', formulaSchema);
const rawMaterialModel = new mongoose.model('rawMaterial', rawMaterialSchema);

app.set('views', './views');
app.set('view engine', 'pug');

// call routes
routes(app, formulaModel, rawMaterialModel);

app.listen(3000);