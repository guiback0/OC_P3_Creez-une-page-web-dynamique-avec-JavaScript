import { generateFiltersOnModal } from "./categories.js";
import { generateProjects } from "./works.js";

const modal = document.querySelector(".modal");
const editModal = modal.querySelector("#editGallery");
const editModalBtn = document.querySelector(".modify");
const addPictureModal = modal.querySelector("#addPicture");
const addPictureModalBtn = modal.querySelector("#addPictureBtn");
const closeModalBtn = modal.querySelectorAll(".fa-xmark");
const pictureInput = modal.querySelector("#photo");
const newWorkFormSubmit = modal.querySelector("#validate");
const goingBack = modal.querySelector(".fa-arrow-left");

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
   deleteProjects.forEach((deleteProject) => {
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
   addPictureModal.style.display = "flex";
   generateFiltersOnModal();
});

closeModalBtn.forEach((closeModalBtn) => {
   closeModalBtn.addEventListener("click", (e) => {
      modal.style.display = "none";
      editModal.style.display = "flex";
      addPictureModal.style.display = "none";
      document.getElementById("title").value = "";
      document.getElementById("selectCategory").selectedIndex = 0;
      document.getElementById("photo").value = null;
      document.querySelector("#picturePreviewImg").src = null;
      document.querySelector("#picturePreview").style.display = "none";
      document.querySelector("#labelPhoto").style.display = "flex";
   });
});

pictureInput.addEventListener("change", (e) => {
   e.preventDefault();
   picturePreview();
});

addPictureModal.addEventListener("change", (e) => {
   e.preventDefault();
   console.log("yes");
   changeSubmitBtnColor();
});

function changeSubmitBtnColor() {
   const select = document.getElementById("selectCategory");
   if (
      document.getElementById("title").value !== "" &&
      document.getElementById("photo").files[0] !== undefined &&
      select.options[select.selectedIndex].id !== ""
   ) {
      newWorkFormSubmit.style.backgroundColor = "var(--firstColor)";
   } else {
      newWorkFormSubmit.style.backgroundColor = "#a7a7a7";
   }
}

goingBack.addEventListener("click", (e) => {
   e.preventDefault();
   editModal.style.display = "flex";
   addPictureModal.style.display = "none";
});

function generateProjectsOnModal(works) {
   const sectionProjects = editModal.querySelector(".modalContent");
   sectionProjects.innerHTML = "";

   for (let i = 0; i < works.length; i++) {
      const project = works[i];

      const projectElement = document.createElement("figure");
      projectElement.dataset.id = project.id;
      projectElement.className = "miniWork";
      const projectImage = document.createElement("img");
      projectImage.src = project.imageUrl;
      projectImage.alt = project.title;
      const trashCan = document.createElement("i");

      trashCan.classList.add("fa-solid", "fa-trash-can");
      trashCan.dataset.id = project.id;

      sectionProjects.appendChild(projectElement);
      projectElement.append(projectImage, trashCan);
   }
}

function deleteWork(id) {
   let token = localStorage.getItem("token");
   fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
         accept: "*/*",
         authorization: `Bearer ${token}`,
      },
   }).then((response) => {
      if (response.ok) {
         alert("Projet supprimé avec succés");

         worksData = worksData.filter((work) => work.id != id);

         generateProjects(worksData);
         generateProjectsOnModal(worksData);
      } else {
         alert("Erreur : " + response.status);
         /* closeModal; */
      }
   });
}

function picturePreview() {
   const [file] = pictureInput.files;
   if (file) {
      document.querySelector("#picturePreviewImg").src =
         URL.createObjectURL(file);
      document.querySelector("#picturePreview").style.display = "flex";
      document.querySelector("#labelPhoto").style.display = "none";
   }
}

newWorkFormSubmit.addEventListener("click", (e) => {
   e.preventDefault();
   postNewWork();
});

function postNewWork() {
   let token = localStorage.getItem("token");
   const select = document.getElementById("selectCategory");
   const title = document.getElementById("title").value;
   const categoryName = select.options[select.selectedIndex].innerText;
   const categoryId = select.options[select.selectedIndex].id;
   const image = document.getElementById("photo").files[0];
   let validity = formValidation(image, title, categoryId);

   if (validity === true) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("category", categoryId);
      console.log(formData);
      sendNewData(token, formData, title, categoryName);
   }
}

function formValidation(image, title, categoryId) {
   if (image == undefined) {
      alert("Veuillez ajouter une image");
      return false;
   }
   if (title.trim().length == 0) {
      alert("Veuillez ajouter un titre");
      return false;
   }
   if (categoryId == "") {
      alert("Veuillez choisir une catégorie");
      return false;
   } else {
      return true;
   }
}

function sendNewData(token, formData, title, categoryName) {
   fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
         authorization: `Bearer ${token}`,
      },
      body: formData,
   })
      .then((response) => {
         if (response.ok) {
            alert("Nouveau fichier envoyé avec succés : " + title);
            return response.json();
         } else {
            console.error("Erreur:", response.status);
         }
      })
      .then((data) => {
         addToWorksData(data, categoryName);
         generateProjects(works);
         document.querySelector(".modal").style.display = "none";
      })
      .catch((error) => console.error("Erreur:", error));
}

function addToWorksData(data, categoryName) {
   if (!data || !data.title || !data.id || !data.categoryId || !data.imageUrl) {
      console.error("Error: Invalid data received");
      return;
   }

   let newWork = {
      title: data.title,
      id: data.id,
      category: { id: data.categoryId, name: categoryName },
      imageUrl: data.imageUrl,
   };

   worksData.push(newWork);
}
