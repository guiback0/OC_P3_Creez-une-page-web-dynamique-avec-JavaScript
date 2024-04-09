let categories = window.sessionStorage.getItem("categories");

if (categories === null) {
   const reponse = await fetch("http://localhost:5678/api/categories");
   categories = await reponse.json();
   const valueCategories = JSON.stringify(categories);
   window.sessionStorage.setItem("categories", valueCategories);
} else {
   categories = JSON.parse(categories);
}
function generateFilters(categories) {
   const sectionFilters = document.getElementById("portfolio");
   const filtersBar = document.createElement("div");
   filtersBar.className = "filtersBar";
   const btn = document.createElement("button");
   btn.className = "filter";
   btn.dataset.id = 0;
   btn.innerText = "Tous";
   btn.classList.add("active");

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
   }
}

generateFilters(categories);

export function generateFiltersOnModal() {
   const categoryForm = document.querySelector("#selectCategory");
   categoryForm.innerHTML = "";

   let option = document.createElement("option");
   categoryForm.appendChild(option);
   categories.forEach((categorie) => {
      option = document.createElement("option");
      option.value = categorie.name;
      option.innerText = categorie.name;
      option.id = categorie.id;
      categoryForm.appendChild(option);
   });
}
