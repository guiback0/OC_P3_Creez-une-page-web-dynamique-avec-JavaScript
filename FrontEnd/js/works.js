let works = window.sessionStorage.getItem("works");

if (works === null) {
   const reponse = await fetch("http://localhost:5678/api/works");
   works = await reponse.json();
   const valueWorks = JSON.stringify(works);
   window.sessionStorage.setItem("works", valueWorks);
} else {
   works = JSON.parse(works);
}

export function generateProjects(works) {
   for (let i = 0; i < works.length; i++) {
      const project = works[i];
      const sectionProjects = document.querySelector(".gallery");
      const projectElement = document.createElement("figure");
      projectElement.dataset.id = project.id;
      const projectContainerImage = document.createElement("div");
      projectContainerImage.className = "pictureContainer";
      const projectImage = document.createElement("img");
      projectImage.src = project.imageUrl;
      const projectCaption = document.createElement("figcaption");
      projectCaption.innerText = project.title;

      sectionProjects.appendChild(projectElement);
      projectContainerImage.appendChild(projectImage);
      projectElement.append(projectContainerImage, projectCaption);
   }
}

generateProjects(works);

const filtersBar = document.querySelector(".filtersBar");
const filters = filtersBar.querySelectorAll(".filter");

filtersBar.addEventListener("click", (e) => {
   filters.forEach((filter) => {
      filter.style.backgroundColor = "white";
      filter.style.color = "var(--firstColor)";
   });
   const id = e.target.dataset.id;
   let filteredProjects;

   const filter = document.querySelector(`.filter[data-id="${id}"]`);

   if (!id) return;
   if (id === "0") {
      filteredProjects = works;
      filter.style.backgroundColor = "var(--firstColor)";
      filter.style.color = "white";
   } else {
      filteredProjects = works.filter(
         (works) => works.categoryId.toString() === id
      );
      filter.style.backgroundColor = "var(--firstColor)";
      filter.style.color = "white";
   }
   document.querySelector(".gallery").innerHTML = "";
   generateProjects(filteredProjects);
});

function connected() {
   if (sessionStorage.getItem("token")) {
      const login = document.getElementById("login");
      login.style.display = "none";
      const logout = document.getElementById("logout");
      const editBanner = document.querySelector(".editBanner");
      logout.style.display = "block";
      editBanner.style.display = "flex";
      logout.addEventListener("click", () => {
         sessionStorage.clear();
         window.location.reload();
      });
      const modifyBtn = document.querySelector(".modify");
      modifyBtn.style.display = "flex";
   }
}

connected();
