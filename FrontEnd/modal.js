const modal = document.querySelector(".modal")
const modalBtn = document.querySelector(".modify")
const closeModal = modal.querySelector(".fa-xmark")

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
    generateProjectsOnModal(works);
   

})

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
})


function generateProjectsOnModal(works) {
      const sectionProjects = modal.querySelector(".modalContent");
       sectionProjects.innerHTML = "";

      for (let i = 0; i < works.length; i++) {
       const project = works[i];
       
       const projectElement = document.createElement("figure");
       projectElement.dataset.id = project.id;
       projectElement.className = "miniWork"
       const projectImage = document.createElement("img");
       projectImage.src = project.imageUrl;
       projectImage.alt = project.title
       const projectCaption = document.createElement("figcaption");
       projectCaption.innerText = "éditer";
       const trashCan = document.createElement("i");
       
      trashCan.classList.add("fa-solid", "fa-trash-can");
 
       sectionProjects.appendChild(projectElement);
       projectElement.append(projectImage, projectCaption, trashCan);

      
    }
 }
 
 