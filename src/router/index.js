const fs = require("fs");

// 这样写就不能使用箭头函数了，箭头函数没有this
const useRoutes = function () {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return; // 将每一个文件都引入，进行注册
    const router = require(`./${file}`); // 谁调用此函数，this就是谁，this的隐式绑定，this就是app，所以app不用传过来了
    this.use(router.routes());
    this.use(router.allowedMethods());
  });
};

module.exports = useRoutes;
