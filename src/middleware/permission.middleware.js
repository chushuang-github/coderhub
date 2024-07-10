const permissionService = require("../service/permission.service");
const { OPERATION_IS_NOT_ALLOW } = require("../config/error");

// 判断用户是否可以修改和删除动态
const verifyMomentPermission = async (ctx, next) => {
  // 1.获取登录用户id 和 动态的id
  const { momentId } = ctx.params;
  const { id } = ctx.user;

  // 2.根据动态id，查询是否可以修改动态的权限
  const isPermission = await permissionService.checkMoment(momentId, id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOW, ctx);
  }

  // 3执行下一个中间件
  await next();
};

module.exports = {
  verifyMomentPermission,
};
