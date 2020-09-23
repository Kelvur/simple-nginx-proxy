// Core
const { createElement } = require('../utils')
// Style
require('./newUserForm.css')


export function renderNewUserForm(callback, parentNode){
    // <div className="newUserForm">
    //     <form action="#" className="">
    //         <label for="name">Name</label>
    //         <input type="text" name="name" />
    //         <label for="book">Book</label>
    //         <input type="text" name="book" />
    //         <button type="submit">Submit</button>
    //     </form>
    // </div>
    const div = createElement('div', {className: 'newUserForm'}, undefined, parentNode)
    const form = createElement('form', {action: '#', className: 'newUserFormForm'} , undefined, div)
    new Array('Name', 'Book').forEach(value => {
        const key = value.toLocaleLowerCase();
        createElement('label', {for: key}, value, form)
        createElement('input', {name: key, type: 'text'}, undefined, form)
    })
    createElement('button', {type: 'submit'}, 'Submit', form)
    form.addEventListener('submit', (evt) => {
        evt.preventDefault()
        callback(evt, {
            name: evt.target[0].value,
            book: evt.target[1].value
        })
    })
}