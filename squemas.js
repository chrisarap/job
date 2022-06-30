const mongoose = require('mongoose');

const formulaSchema = new mongoose.Schema({
  username: String,
  formula: String,
  code: Number,
  productLine: String
});

const rawMaterialSchema = new mongoose.Schema({
  name: String,
  date: Date,
  active: Boolean,
  unit: String,
  code: Number,
  cost: Number,
  price: Number,
  deparment: String,
  utility: Number,
  currency: String
});

module.exports = {
  formulaSchema,
  rawMaterialSchema
};