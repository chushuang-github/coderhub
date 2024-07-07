const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");

const app = new Koa();

app.use(bodyParser());
// 路由注册
app.useRoutes = useRoutes;
app.useRoutes();

module.exports = app;
