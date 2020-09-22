const {get, post} = require('./api');


export function fetchUsers(){
    return get('/users');
}

export function createUser(user) {
    return post('/users', user)
}