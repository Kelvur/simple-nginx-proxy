// Core
const { createElement } = require('../utils')
// Style
require('./user.css')


export function renderUser(user, parentNode){
    // <div className="user">
    //     <h3 className="userName">{user.name}</h3>
    //     <span className="userBook">{user.book}</span>
    // </div>
    const div = createElement('div', {name: 'className', value: 'user'}, '', parentNode)
    createElement('h3', {name: 'className', value: 'userName'}, user.name, div)
    createElement('span', {name: 'className', value: 'userBook'}, user.book, div)
}

export function removeUsers(parentNode){
    parentNode.querySelectorAll('.user').forEach(userNode => userNode.remove())
}