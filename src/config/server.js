const dotenv = require("dotenv");

// 在您的应用程序中，要求并配置dotenv
dotenv.config();

// 会将.env文件中的配置信息写在process.env上
// console.log(process.env.SERVER_PORT); // 输出：8000

// 导出方式：从process.env中解构出APP_PORT，之后通过module.exports导出
// 先解构，在导出，相当于两步操作用下面的方式一起做了
module.exports = { SERVER_PORT } = process.env;
