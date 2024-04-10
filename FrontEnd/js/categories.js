//* Importing the fetchEndPoint function from the api.js module
import { fetchEndPoint } from "./api.js";

let categories;

//* Asynchronous function to connect and fetch categories data
async function connect() {
   const id = "categories";

   try {
      categories = await fetchEndPoint(id);

      generateFilters(categories);
   } catch (error) {
      console.error(error);
   }
}

connect();

//* Function to generate filters based on the provided categories data
function generateFilters(categories) {
   const sectionFilters = document.getElementById("portfolio");

   const filtersBar = document.createElement("div");
   filtersBar.className = "filtersBar";

   // Creating a button for filtering 'All' categories
   const btn = document.createElement("button");
   btn.className = "filter";
   btn.dataset.id = 0;
   btn.innerText = "Tous";
   btn.classList.add("active");

   sectionFilters.appendChild(filtersBar);
   filtersBar.appendChild(btn);

   // Iterating through each category to generate a filter button for each
   categories.forEach((filter) => {
      const btn = document.createElement("button");
      btn.className = "filter";
      btn.dataset.id = filter.id;
      btn.innerText = filter.name;

      filtersBar.appendChild(btn);
   });
}

//* Exported function to generate filters in a modal
export function generateFiltersOnModal() {
   const categoryForm = document.querySelector("#selectCategory");
   categoryForm.innerHTML = "";

   let option = document.createElement("option");

   // Creating and appending options for each category in the category form
   categoryForm.appendChild(option);
   categories.forEach((categorie) => {
      option = document.createElement("option");
      option.value = categorie.name;
      option.innerText = categorie.name;
      option.id = categorie.id;
      categoryForm.appendChild(option);
   });
}
