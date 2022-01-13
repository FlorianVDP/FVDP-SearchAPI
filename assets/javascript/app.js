window.addEventListener(
    "DOMContentLoaded", async () => {
        const body = document.getElementById("body")
        /*
        ===================================== Basics Functions
         */
        function createElement(tagName, id, parent, elementClass, content){
            let element = document.createElement(tagName);
            parent.append(element);
            if (id){
                element.id = id;
            }
            if (elementClass){
                let arrayElementClass = elementClass.split(' ')
                arrayElementClass.forEach((item) =>{
                    element.classList.add(item)
                })
            }
            if (content){
                element.textContent = content;
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
        /*
        ===================================== Add Basics elements
         */
        //Section Search
        let sectionSearch = createElement("section", "search", body);
        let wrapperSectionSearch = createElement("div", "", sectionSearch, "wrapper-section");
        let title = createElement("h1", "", wrapperSectionSearch, "");
        title.textContent = "Recherchez votre chez-vous";
        let wrapperForm = createElement("div", "", wrapperSectionSearch, "wrapper-form")
        let wrapperFormBtn = createElement("button", "", wrapperForm, "btnSearch")
        let searchInput = createElement("input", "searchInput", wrapperForm, "");
        searchInput.placeholder = "Chercher une adresse…"
        let displayedAutocompleteList = createElement("ul", "", wrapperForm, "");

        //Section List
        let sectionList = createElement("section", "liste", body);
        let wrapperSectionList = createElement("div", "", sectionList, "wrapper-section");
        let titleSectionList = createElement("h2", "", wrapperSectionList, "");
        titleSectionList.textContent = "Ma liste";
        let filterbutton = createElement("button", "", wrapperSectionList, "material-icons filter", "toggle_off");
        let displayedtodoList = createElement("ul", "", wrapperSectionList, "")
        let arrayList = [];
        let arrayListReset = [];
        let sessionStorageItem = sessionStorage.getItem("todoList");

        if (sessionStorageItem === null || JSON.parse(sessionStorage.getItem("todoList")).length === 0){
            sectionList.classList.remove("active");
        }else{
            arrayList = JSON.parse(sessionStorage.getItem("todoList"));
            sectionList.classList.add("active");
        }

        /*
        ===================================== Functions
         */
        function createTodoList(liste, filtre){
            if (liste[0] != undefined){
                let todolist = document.createElement("ul")
                liste.forEach((item, key) =>{
                    if (filtre === true){
                        if (item.status === true){
                            let todoElement = createElement("li", "", todolist, "");
                            todoElement.title = item.textContent;
                            let todoElementIntitule = createElement("span", "", todoElement, "");
                            todoElementIntitule.textContent = item.textContent;
                            let buttonCmd = createElement("div", "", todoElement, "wrapper-cmd")
                            let todoElementButtonCheck = createElement("button", "", buttonCmd, "material-icons", "check_box_outline_blank")
                            todoElementButtonCheck.title = "Valider la commande";
                            let todoElementButtonRemove = createElement("button", "", buttonCmd, "material-icons", "remove_circle_outline")
                            todoElementButtonRemove.title = "Supprimer la commande";
                            if (item.status){
                                todoElement.classList.add("check")
                                todoElementButtonCheck.textContent = "check_box";
                            }
                            displayedtodoList.replaceWith(todolist)
                            displayedtodoList = todolist;
                            todoElementButtonRemove.addEventListener(
                                "click", ()=>{
                                    arrayList = arrayList.filter((item, key2)=>{
                                        return key2 != key;
                                    })
                                    sessionStorage.setItem("todoList", JSON.stringify(arrayList));
                                    createTodoList(arrayList)
                                }
                            )

                            todoElementButtonCheck.addEventListener(
                                "click", ()=>{
                                    if (todoElement.classList.contains("check")){
                                        todoElement.classList.remove("check")
                                        todoElementButtonCheck.textContent = "check_box_outline_blank";
                                        liste[key].status = false;
                                    }else{
                                        todoElement.classList.add("check")
                                        todoElementButtonCheck.textContent = "check_box";
                                        liste[key].status = true;
                                    }
                                    sessionStorage.setItem("todoList", JSON.stringify(arrayList));
                                }
                            )
                        }else{

                        }
                    }else{
                        let todoElement = createElement("li", "", todolist, "");
                        todoElement.title = item.textContent;
                        let todoElementIntitule = createElement("span", "", todoElement, "");
                        todoElementIntitule.textContent = item.textContent;
                        let buttonCmd = createElement("div", "", todoElement, "wrapper-cmd")
                        let todoElementButtonCheck = createElement("button", "", buttonCmd, "material-icons", "check_box_outline_blank")
                        todoElementButtonCheck.title = "Valider la commande";
                        let todoElementButtonRemove = createElement("button", "", buttonCmd, "material-icons", "remove_circle_outline")
                        todoElementButtonRemove.title = "Supprimer la commande";
                        if (item.status){
                            todoElement.classList.add("check")
                            todoElementButtonCheck.textContent = "check_box";
                        }
                        displayedtodoList.replaceWith(todolist)
                        displayedtodoList = todolist;

                        todoElementButtonRemove.addEventListener(
                            "click", ()=>{
                                arrayList = arrayList.filter((item, key2)=>{
                                    return key2 != key;
                                })
                                createTodoList(arrayList)
                                sessionStorage.setItem("todoList", JSON.stringify(arrayList));

                            }
                        )

                        todoElementButtonCheck.addEventListener(
                            "click", ()=>{
                                if (todoElement.classList.contains("check")){
                                    todoElement.classList.remove("check")
                                    todoElementButtonCheck.textContent = "check_box_outline_blank";
                                    liste[key].status = false;
                                }else{
                                    todoElement.classList.add("check")
                                    todoElementButtonCheck.textContent = "check_box";
                                    liste[key].status = true;
                                }
                                sessionStorage.setItem("todoList", JSON.stringify(arrayList));
                            }
                        )
                    }
                })
            }else{
                sectionList.classList.remove("active")
            }
        }

        /*
        ===================================== App start
         */

        createTodoList(arrayList)

        /*
        ===================================== Events
         */
        filterbutton.addEventListener(
            "click", ()=>{
                if (filterbutton.classList.contains("on")){
                    filterbutton.classList.remove("on")
                    filterbutton.textContent = "toggle_off";
                    createTodoList(arrayList)
                }else{
                    filterbutton.classList.add("on")
                    filterbutton.textContent = "toggle_on";
                    createTodoList(arrayList, true)
                }
            }
        )
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
                    let autoCompleteListElement = document.createElement("ul");
                    if (autoCompleteList.length != 0){
                        autoCompleteList.forEach((element) =>{
                            let label = element.properties.label;
                            let itemAutocomplete = createElement("li", "", autoCompleteListElement, "");
                            itemAutocomplete.textContent = label;
                            itemAutocomplete.addEventListener(
                                "click", ()=>{
                                    let itemAttributes = {
                                        textContent : itemAutocomplete.textContent,
                                        status : false
                                    }
                                    arrayList.push(itemAttributes)
                                    sessionStorage.setItem("todoList", JSON.stringify(arrayList));
                                    createTodoList(arrayList)
                                    //reset
                                    searchInput.value = "";
                                    searchValue = 0;
                                    sectionList.classList.add("active");
                                    displayedAutocompleteList.classList.remove("active")
                                } // end function addEventListener itemAutocomplete
                            ) // end addEventListener itemAutocomplete
                        }) //endForeach autoCompleteList
                        if (searchValue === "0"){
                            displayedAutocompleteList.classList.remove("active")
                        }else{
                            displayedAutocompleteList.classList.add("active")
                        }

                    }else{
                        if (searchValue = "0"){
                            let item = createElement("li", "", autoCompleteListElement, "");
                            item.textContent = "Aucun résultats";
                            item.classList.add("disabled")
                        }
                    }

                    displayedAutocompleteList.replaceWith(autoCompleteListElement)
                    displayedAutocompleteList = autoCompleteListElement;
                    displayedAutocompleteList.classList.add("active")
                }
                if (responseApi){
                    autocompleteList();
                }
            }
        )
        searchInput.addEventListener(
            "focusout", ()=>{
                displayedAutocompleteList.classList.remove("active")
            }
        )
        searchInput.addEventListener(
            "focusin", ()=>{
                if (searchInput.value != "0"){
                    displayedAutocompleteList.classList.add("active")
                }
            }
        )
    } //endFunctionEventListener ------------------ */
) //endEventListener ------------------------------ */