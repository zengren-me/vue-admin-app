import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 列表菜单展开，true为展开
    collapsed: false,
    user: getUserCookie(),
    MenuRoutes: [], // 保存用户能访问的路由，便于列表菜单渲染
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    userLogin(state, userInfo) {
       state.user = userInfo;
    },
    userLogout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    setMenuRoutes(state, MenuRoutes) {
      state.MenuRoutes = MenuRoutes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    userLogin({ commit }, userInfo) {
      commit('userLogin', userInfo);
      setUserCookie(userInfo);
    },
    userLogout({ commit }) {
      commit('userLogout');
      removeUserCookie();
    },
    setMenuRoutes({ commit }, MenuRoutes) {
      commit('setMenuRoutes', MenuRoutes);
    },
  },
  modules: {
  },
});
