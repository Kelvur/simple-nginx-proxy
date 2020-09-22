// Services
const { fetchUsers, createUser } = require('./services/users')
// Components
const { renderUser, removeUsers } = require('./components/user')
const { renderNewUserForm } = require('./components/newUserForm')


const root = document.getElementById('root')

// Render Users
fetchUsers().then(users => {
    users.forEach(user => renderUser(user, root))
})

// Render Form
renderNewUserForm((_, values) => {
    createUser(values).then(users => {
        removeUsers(root)
        users.forEach(user => renderUser(user, root))
    });
}, root);