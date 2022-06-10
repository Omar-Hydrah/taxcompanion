const data = require("../data/tax_data.json");
const taxModel = {};

taxModel.getTaxData = function () {
  return data;
};

module.exports = taxModel;
