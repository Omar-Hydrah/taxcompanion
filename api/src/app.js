"use strict";

const koa = require("koa");
const cors = require("@koa/cors");
const router = require("@koa/router")();
const app = new koa();
const taxRouter = require("./routers/tax_router");

router.get("/home", (ctx) => {
  ctx.body = "Tax Companion";
});
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.use(taxRouter.routes()).use(router.allowedMethods());
const server = app.listen(8080);

process.on("SIGTERM", function () {
  server.close(function () {
    console.log("Closing server");
    server.close();
    process.exit(0);
  });
});
