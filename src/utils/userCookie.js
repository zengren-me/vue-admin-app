import Cookie from 'js-cookie';

export function setUserCookie(data) {
    Object.entries(data).forEach(([key, value]) => {
        Cookie.set(key, value);
    });
    return true;
}

export function getUserCookie() {
    return {
        username: Cookie.get('username'),
        appkey: Cookie.get('appkey'),
        role: Cookie.get('role'),
        email: Cookie.get('email'),
    };
}

export function removeUserCookie() {
    Cookie.remove('username');
    Cookie.remove('appkey');
    Cookie.remove('role');
    Cookie.remove('email');
    return true;
}
