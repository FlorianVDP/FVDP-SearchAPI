let searchInput = createElement("input", "searchInput", wrapperForm, "");
let displayedList = createElement("ul", "", wrapperForm, "");
searchInput.addEventListener(
    "input", async ()=>{
        let searchValue = searchInput.value;
        let urlApi = getJson("https://api-adresse.data.gouv.fr/search/?q="+searchValue+"&type=housenumber&autocomplete=1");

        let responseApi = await Promise.all([urlApi], [""]);
        if (responseApi){
            autocompleteList();
        }
    }
)