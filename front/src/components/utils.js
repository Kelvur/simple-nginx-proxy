
export function createElement(element, attributes, text, parent){
    const node = document.createElement(element)
    Object.keys(attributes).forEach(key => {
        node[key] = attributes[key];
    })
    if(text) node.innerText = text
    parent.appendChild(node)
    return node
}