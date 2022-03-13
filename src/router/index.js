import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes, asyncRouterMap } from './routes';
import store from '../store';
import filterRoleRouter from '../utils/permission';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 路由push不跳转 报错问题解决
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   // if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(() => {
//       originalPush.call(this, location, onResolve, onReject);
//   });
// };

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register') {
    if (store.state.user.username && store.state.user.appkey && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = filterRoleRouter(store.state.user.role, asyncRouterMap);
        // 过滤掉login & register路由 以便菜单的渲染
        const filterMenuRoutes = routes.concat(menuRoutes);
        store.dispatch('setMenuRoutes', filterMenuRoutes).then(() => {
          router.addRoutes(menuRoutes);
          next();
      });
        isAddRoutes = true;
      }
      return next();
    }
      return next('/login');
  }
  return next();
});

export default router;
