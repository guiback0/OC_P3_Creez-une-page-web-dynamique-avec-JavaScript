import {generateFiltersOnModal} from "./categories.js";


const modal = document.querySelector(".modal")
const editModal = modal.querySelector("#editGallery")
const editModalBtn = document.querySelector(".modify")
const addPictureModal = modal.querySelector("#addPicture")
const addPictureModalBtn = modal.querySelector("#addPictureBtn")
const closeModalBtn = modal.querySelectorAll(".fa-xmark");
const pictureInput = modal.querySelector("#photo")



let works = window.localStorage.getItem("works");

if (works === null) {
   const reponse = await fetch("http://localhost:5678/api/works");
   works = await reponse.json();
   const valueWorks = JSON.stringify(works);
   window.localStorage.setItem("works", valueWorks);
} else {
   works = JSON.parse(works);
}

editModalBtn.addEventListener("click", (e) => {
   e.preventDefault();
  
   modal.style.display = "flex";
   generateProjectsOnModal(works);

   const deleteProjects = modal.querySelectorAll(".fa-trash-can");
   deleteProjects.forEach(deleteProject => {
       deleteProject.addEventListener("click", (e) => {
           e.preventDefault();
           const id = e.target.dataset.id;
           deleteWork(id);
       });
   });

});

addPictureModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  editModal.style.display = "none";
  addPictureModal.style.display = "flex"
  generateFiltersOnModal()
})

   closeModalBtn.forEach(closeModalBtn => {
       closeModalBtn.addEventListener("click", (e) => {
           modal.style.display = "none"
           editModal.style.display = "flex";
           addPictureModal.style.display = "none"
       });
      });

function generateProjectsOnModal(works) {
      const sectionProjects = editModal.querySelector(".modalContent");
       sectionProjects.innerHTML = "";

      for (let i = 0; i < works.length; i++) {
       const project = works[i];
       
       const projectElement = document.createElement("figure");
       projectElement.dataset.id = project.id;
       projectElement.className = "miniWork"
       const projectImage = document.createElement("img");
       projectImage.src = project.imageUrl;
       projectImage.alt = project.title
       const trashCan = document.createElement("i");
       
      trashCan.classList.add("fa-solid", "fa-trash-can");
      trashCan.dataset.id = project.id;
 
       sectionProjects.appendChild(projectElement);
       projectElement.append(projectImage, trashCan);

    }
 }
 
 function deleteWork(id) {
   let token = localStorage.getItem("token")
   fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      
      if (response.ok) {
        alert("Projet supprimé avec succés")

        worksData = worksData.filter((work) => work.id != id);
        
        generateProjects(worksData);
        generateProjectsOnModal(worksData);
        
      } else {
        alert("Erreur : " + response.status);
        closeModal;
      }
    });
  }
  

  pictureInput.addEventListener("change", (e) => {
    e.preventDefault();
    picturePreview()
  })

  function picturePreview(){
    
    const [file] = pictureInput.files;
    if (file) {
      document.querySelector("#picturePreviewImg").src = URL.createObjectURL(file);
      document.querySelector("#picturePreview").style.display = "flex";
      document.querySelector("#labelPhoto").style.display = "none";
    }
  
  }
    

