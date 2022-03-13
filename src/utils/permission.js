// 不同角色允许进入的路由名
const allowRouterName = {
    coustomer: [{
        name: 'Home',
    }, {
        name: 'Index',
    }, {
        name: 'Product',
    }, {
        name: 'ProductList',
    }, {
        name: 'ProductAdd',
    }, {
        name: 'ProductEdit',
    }],
    admin: [{
        name: 'Home',
    }, {
        name: 'Index',
    }, {
        name: 'Product',
    }, {
        name: 'ProductList',
    }, {
        name: 'ProductAdd',
    }, {
        name: 'ProductEdit',
    }, {
        name: 'CategoryList',
    }, {
        name: 'CategoryAdd',
    }, {
        name: 'CategoryEdit',
    }],
};

/**
 * 筛选出该角色能进入的路由 的路由配置对象
 * @param {String} role 角色
 * @param {Array} routerList 路由列表
 */
export default function filterRoleRouter(role, routerList) {
    const roleRouterList = allowRouterName[role].map((item) => item.name);
    return routerList.filter((item) => {
        const obj = item;
        if (roleRouterList.indexOf(item.name) !== -1) {
            const { children } = obj;
            obj.children = children.filter((i) => roleRouterList.indexOf(i.name) !== -1);
            return true;
        }
        return false;
    });
}
