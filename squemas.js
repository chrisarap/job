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
    data: {
      unit: String,
      code: Number,
      cost: Number,
      freightCode: Number,
      freightCost: Number
    }
  });

exports.formulaSchema;
exports.rawMaterialSchema;