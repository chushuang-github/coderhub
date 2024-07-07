const app = require("./app/index");
const { SERVER_PORT } = require("./config/server");

// 全局错误处理
require("./utils/handle-error");

// 启动服务
app.listen(SERVER_PORT, () => {
  console.log("coderhub的服务器启动成功~");
});
