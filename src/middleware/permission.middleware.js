const permissionService = require("../service/permission.service");
const { OPERATION_IS_NOT_ALLOW } = require("../config/error");

// 判断用户是否可以修改和删除动态
const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户id
  const { id } = ctx.user;

  // 2.获取资源name/id
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  // 3.根据动态id，查询是否可以修改动态的权限
  const isPermission = await permissionService.checkResource(
    resourceName,
    resourceId,
    id
  );

  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOW, ctx);
  }

  // 4.执行下一个中间件
  await next();
};

module.exports = {
  verifyPermission,
};
