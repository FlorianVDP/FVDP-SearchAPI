function createElement(tagName, id, parent, elementClass){
    let element = document.createElement(tagName);
    parent.append(element);
    if (id){
        element.id = id;
    }
    if (elementClass){
        element.classList.add(elementClass)
    }
    return element;
}
function getJson(url) {
    return fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .catch(function (err) {
            console.error(err);
        });
}