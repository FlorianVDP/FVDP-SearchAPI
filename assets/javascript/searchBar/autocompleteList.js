function autocompleteList(){
    let autoCompleteList = responseApi[0].features;
    let autoCompleteListElement = document.createElement("ul");
    autoCompleteList.forEach((element, index) =>{
        console.log(element)
        let coordinates = element.geometry.coordinates;
        let label = element.properties.label;
        let item = createElement("li", "", autoCompleteListElement, "");
        item.textContent = label;
        console.log(item)
    })
    displayedList.replaceWith(autoCompleteListElement)
    displayedList = autoCompleteListElement;
    console.log(searchValue)
    if (searchValue){

    }else{
        displayedList.classList.remove("active")
    }
    displayedList.classList.add("active")
}