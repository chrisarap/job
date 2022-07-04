const mongoose = require('mongoose');

const formulaSchema = new mongoose.Schema({
  code: Number,
  productLine: String,
  name: String,
  formula: String,
  ingredients: {
    code: Number,
    amount: Number
  }
});

const rawMaterialSchema = new mongoose.Schema({
  name: String,
  code: Number,
  cost: Number,
  freightCode: Number,
  unit: String,
  deparment: String,
  date: Date,
  active: Boolean,
  freight: Boolean,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = {
  formulaSchema,
  rawMaterialSchema,
  userSchema
};