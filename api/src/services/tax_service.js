const taxService = {};

taxService.getTaxPercentage = async function (
  { country, salary },
  { getTaxData }
) {
  let result = "0%";
  const taxData = await getTaxData();
  if (!(country in taxData)) {
    result = taxData["all"][0]["tax"];
    return result;
  }
  const countryTax = taxData[country];
  if (salary === undefined) {
    result = countryTax[0]["tax"];
    return result;
  }
  countryTax.reverse();
  for (let i = 0; i < countryTax.length; i++) {
    if (salary > countryTax[i]["value"]) {
      result = countryTax[i]["tax"];
      return result;
    }
  }
  return result;
};

module.exports = taxService;
