// Core
const { createElement } = require('../utils')
// Style
require('./user.css')


export function renderUser(user, parentNode){
    // <div className="user">
    //     <h3 className="userName">{user.name}</h3>
    //     <span className="userBook">{user.book}</span>
    // </div>
    const div = createElement('div', {className: 'user'}, undefined, parentNode)
    createElement('h3', {className: 'userName'}, user.name, div)
    createElement('span', {className: 'userBook'}, user.book, div)
}

export function removeUsers(parentNode){
    parentNode.querySelectorAll('.user').forEach(userNode => userNode.remove())
}