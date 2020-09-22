
const BASE_URL = process.env.BASE_URL || '/api';

export function get(resource){
    return fetch(BASE_URL + resource, { method: 'GET' }).then(response => response.json()).catch(error => console.error(error))
}

export function post(resource, body){
    return fetch(BASE_URL + resource, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
    }).then(response => response.json()).catch(error => console.error(error))
}