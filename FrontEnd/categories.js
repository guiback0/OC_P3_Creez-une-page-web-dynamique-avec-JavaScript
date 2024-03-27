let categories = window.localStorage.getItem("categories")

if (categories === null){
    const reponse = await fetch("http://localhost:5678/api/categories");
    categories = await reponse.json();
    const valueCategories = JSON.stringify(categories);
    window.localStorage.setItem("categories", valueCategories);
}else{
    categories = JSON.parse(categories);
}
function generateFilters(categories){
    const sectionFilters = document.getElementById("portfolio");
    const filtersBar = document.createElement("div")
    filtersBar.className = "filtersBar";
    const btn = document.createElement("button");
        btn.className = "filter";
        btn.dataset.id = 0;
        btn.innerText = "Tous";
        sectionFilters.appendChild(filtersBar);
        filtersBar.appendChild(btn);


    for (let i = 0; i < categories.length; i++) {
        const filter = categories[i];
        const filtersBar = document.querySelector(".filtersBar");
        const btn = document.createElement("button");
        btn.className = "filter";
        btn.dataset.id = filter.id;
        btn.innerText = filter.name;

        filtersBar.appendChild(btn);
}}

generateFilters(categories);










