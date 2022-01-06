window.addEventListener(
    "DOMContentLoaded", async () => {
        const body = document.getElementById("body")
        // Basics Functions
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

        // Add Basics elements
        let sectionSearch = createElement("section", "search", body);
        let wrapperSectionSearch = createElement("div", "", sectionSearch, "wrapper-section");
        let title = createElement("h1", "", wrapperSectionSearch, "");
        title.textContent = "Recherchez votre chez-vous";
        let wrapperForm = createElement("div", "", wrapperSectionSearch, "wrapper-form")

        // Add searchBar
        let searchInput = createElement("input", "searchInput", wrapperForm, "");
        searchInput.placeholder = "Chercher une adresse…"
        let displayedList = createElement("ul", "", wrapperForm, "");
        searchInput.addEventListener(
            "input", async ()=>{
                let searchValue = searchInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (!searchValue){
                    searchValue = "0";
                }else{
                    searchValue = searchInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                }
                let urlApi = getJson("https://api-adresse.data.gouv.fr/search/?q="+searchValue+"&type=housenumber&autocomplete=1");

                let responseApi = await Promise.all([urlApi], [""]);
                function autocompleteList(){
                    let autoCompleteList = responseApi[0].features;
                    //console.log(autoCompleteList)
                    let autoCompleteListElement = document.createElement("ul");
                    if (autoCompleteList.length != 0){
                        autoCompleteList.forEach((element, index) =>{
                            let coordinates = element.geometry.coordinates;
                            let label = element.properties.label;
                            let item = createElement("li", "", autoCompleteListElement, "");
                            item.textContent = label;
                        })
                        if (searchValue === "0"){
                            displayedList.classList.remove("active")
                        }else{
                            displayedList.classList.add("active")
                        }
                    }else{
                        if (searchValue = "0"){
                            let item = createElement("li", "", autoCompleteListElement, "");
                            item.textContent = "Aucun résultats";
                            item.classList.add("disabled")
                        }
                    }

                    displayedList.replaceWith(autoCompleteListElement)
                    displayedList = autoCompleteListElement;
                    displayedList.classList.add("active")
                    console.log("searchValue : " + searchValue)
                }
                if (responseApi){
                    autocompleteList();
                }
            }
        )

        searchInput.addEventListener(
            "focusout", ()=>{
                displayedList.classList.remove("active")
            }
        )
        searchInput.addEventListener(
            "focusin", ()=>{
                if (searchInput.value != "0"){
                    displayedList.classList.add("active")
                }
            }
        )


    } //endFunctionEventListener ------------------ */
) //endEventListener ------------------------------ */