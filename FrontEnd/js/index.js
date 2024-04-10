//* Importing the fetchEndPoint function from the api.js module
import { fetchEndPoint } from "./api.js";

let works;

//* Asynchronous function to fetch works data and set up filters
async function connect() {
   const id = "works";
   try {
      works = await fetchEndPoint(id);

      generateProjects(works);
      setupFilters();
   } catch (error) {
      console.error(error);
   }
}

//* Function to generate project elements based on works data
export function generateProjects(works) {
   const sectionProjects = document.querySelector(".gallery");

   // Iterating through each work to create project elements
   works.forEach((project) => {
      const projectElement = document.createElement("figure");
      projectElement.dataset.id = project.id;

      const projectContainerImage = document.createElement("div");
      projectContainerImage.className = "pictureContainer";

      const projectImage = document.createElement("img");
      projectImage.src = project.imageUrl;
      projectImage.alt = project.title;

      const projectCaption = document.createElement("figcaption");
      projectCaption.innerText = project.title;

      sectionProjects.appendChild(projectElement);
      projectContainerImage.appendChild(projectImage);
      projectElement.append(projectContainerImage, projectCaption);
   });
}

//* Function to set up filter functionality
function setupFilters() {
   const filtersBar = document.querySelector(".filtersBar");
   const filters = filtersBar.querySelectorAll(".filter");

   filtersBar.addEventListener("click", (e) => {
      if (!e.target.classList.contains("filter")) {
         return;
      }

      filters.forEach((filter) => {
         filter.classList.remove("active");
      });

      const id = e.target.dataset.id;
      let filteredProjects;
      const filter = document.querySelector(`.filter[data-id="${id}"]`);

      if (!id) return;
      if (id === "0") {
         filteredProjects = works;
         filter.classList.add("active");
      } else {
         filteredProjects = works.filter(
            (work) => work.categoryId.toString() === id
         );
         filter.classList.add("active");
      }
      document.querySelector(".gallery").innerHTML = "";
      generateProjects(filteredProjects);
   });
}

//* Function to check if the user is connected (logged in)
function connected() {
   if (sessionStorage.getItem("token")) {
      const login = document.getElementById("login");
      const logout = document.getElementById("logout");
      const editBanner = document.querySelector(".editBanner");

      login.style.display = "none";
      logout.style.display = "block";
      editBanner.style.display = "flex";

      logout.addEventListener("click", () => {
         sessionStorage.clear("token");
         window.location.reload();
      });
      const modifyBtn = document.querySelector(".modify");

      modifyBtn.style.display = "flex";
   }
}

connect();
connected();
