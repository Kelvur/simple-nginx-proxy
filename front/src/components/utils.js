
export function createElement(element, attribute, text, parent){
    const node = document.createElement(element)
    if(Array.isArray(attribute)){
        attribute.forEach(attr => node[attr.name] = attr.value)
    } else {
        node[attribute.name] = attribute.value
    }
    if(text) node.innerText = text
    parent.appendChild(node)
    return node
}