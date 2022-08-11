const { CloudBaseRunServer } = require("./server");
const routes = require("./routes/index");
const schedule = require("node-schedule");
const { pusher } = require("./service/authService");
const { axiosGet } = require("./core/useAxios");

// 启动任务
let job = schedule.scheduleJob("0 35 7 * * *", async () => {
  console.log("========定时任务启动======", new Date());
  // await axiosGet("https://localhost:7345/api/test", {});
  await pusher();
});

// 创建云托管 Server 实例
const server = new CloudBaseRunServer();
// 注册接口路由 降维数组遍历setRoute
for (const route of routes.flat()) {
  server.setRoute(route.path, route.handler);
}
// 监听端口
server.listen(7345);