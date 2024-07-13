const labelService = require("../service/label.service");

// 验证label标签是否存在
const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递过来的所有label
  const { labels } = ctx.request.body;

  // 2.判断所有的labels中的name是否已经存在与label中
  const newLabels = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    const labelObj = { name };
    if (result) {
      // 获取name对应的label的id
      labelObj.id = result.id;
    } else {
      // 插入name，并且获取插入之后的label的id
      const insertResult = await labelService.create(name);
      labelObj.id = insertResult.insertId;
    }
    newLabels.push(labelObj);
  }

  // 3.所有的labels都变成了[{name: "", id: ""}, {name: "", id: ""}...]
  ctx.labels = newLabels;

  // 4.执行下一个中间件
  await next();
};

module.exports = {
  verifyLabelExists,
};
