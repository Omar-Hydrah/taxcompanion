const router = require("@koa/router")();
const taxService = require("../services/tax_service");
const taxModel = require("../models/tax_model");

router.get("/taxes", async (ctx) => {
  console.log(ctx.request.query);
  const { salary, country } = ctx.request.query;
  const result = await taxService.getTaxPercentage(
    { country: country?.toLowerCase(), salary },
    { getTaxData: taxModel.getTaxData }
  );

  ctx.body = result;
});

module.exports = router;
