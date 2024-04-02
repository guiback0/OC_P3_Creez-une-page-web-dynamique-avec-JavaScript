const modal = document.querySelector(".modal")
const modalBtn = document.querySelector(".modify")
const closeModal = document.getElementById("fa-xmarl")

let works = window.localStorage.getItem("works");

if (works === null) {
   const reponse = await fetch("http://localhost:5678/api/works");
   works = await reponse.json();
   const valueWorks = JSON.stringify(works);
   window.localStorage.setItem("works", valueWorks);
} else {
   works = JSON.parse(works);
}

modalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";


    for (let i = 0; i < works.length; i++) {
        const project = works[i];
        const sectionProjects = document.querySelector(".modalContent");
        const projectElement = document.createElement("figure");
        projectElement.dataset.id = project.id;
        projectElement.className = "miniWork"
        const projectImage = document.createElement("img");
        projectImage.src = project.imageUrl;
        projectImage.alt = project.title
        const projectCaption = document.createElement("figcaption");
        projectCaption.innerText = "éditer";
  
        sectionProjects.appendChild(projectElement);
        projectElement.appendChild(projectImage);
        projectElement.appendChild(projectCaption);
        console.log("yes")
     }
})

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    console.log("yes")
})


/* function generateProjectsOnModal(works) {
    console.log("yes1")
    for (let i = 0; i < works.length; i++) {
       const project = works[i];
       const sectionProjects = document.querySelector(".modalContent");
       const projectElement = document.createElement("figure");
       projectElement.dataset.id = project.id;
       projectElement.className = "miniWork"
       const projectImage = document.createElement("img");
       projectImage.src = project.imageUrl;
       projectImage.alt = project.title
       const projectCaption = document.createElement("figcaption");
       projectCaption.innerText = "éditer";
 
       sectionProjects.appendChild(projectElement);
       projectElement.appendChild(projectImage);
       projectElement.appendChild(projectCaption);
       console.log("yes")
    }
 }
 
 generateProjectsOnModal(works); */