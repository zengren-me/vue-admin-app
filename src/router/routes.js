import Home from '@/views/layout/Home.vue';
import Index from '@/views/page/index.vue';
import EditUser from '@/views/layout/EditUser.vue';
import Login from '@/views/layout/Login.vue';
import Register from '@/views/layout/Register.vue';
import ProductAdd from '@/views/page/productAdd.vue';
import ProductList from '@/views/page/productList.vue';
import CategoryList from '@/views/page/categoryList.vue';
import CategoryAdd from '@/views/page/categoryAdd.vue';

export const asyncRouterMap = [{
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      icon: 'inbox',
    },
    component: Home,
    children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        icon: 'unordered-list',
      },
      component: ProductList,
    }, {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        icon: 'file-add',
      },
      component: ProductAdd,
    }, {
      path: 'edit/:id',
      name: 'ProductEdit',
      meta: {
        hidden: true,
      },
      component: ProductAdd,
    }, {
      path: 'category',
      name: 'CategoryList',
      meta: {
        title: '类目管理',
        icon: 'project',
      },
      component: CategoryList,
    }, {
      path: 'category/add',
      name: 'CategoryAdd',
      meta: {
        title: '添加类目',
        icon: 'file-add',
      },
      component: CategoryAdd,
    }, {
      path: 'category/edit/:id',
      name: 'CategoryEdit',
      meta: {
        hidden: true,
      },
      component: CategoryAdd,
    }],
}];

export const routes = [
    {
      path: '/',
      name: 'Home',
      redirect: '/index',
      meta: {
        title: '首页',
        icon: 'home',
      },
      component: Home,
      children: [
        {
          path: 'index',
          name: 'Index',
          meta: {
            title: '商品统计',
            icon: 'number',
          },
          component: Index,
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        hidden: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        hidden: true,
      },
    },
    {
      path: '/edit',
      name: 'EditUser',
      component: EditUser,
      meta: {
        hidden: true,
      },
    },
];
