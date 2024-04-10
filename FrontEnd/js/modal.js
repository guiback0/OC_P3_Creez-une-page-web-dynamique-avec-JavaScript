//* Importing necessary functions/modules
import { generateFiltersOnModal } from "./categories.js";
import { generateProjects } from "./index.js";
import { fetchEndPoint } from "./api.js";

//*********** Global ***********//
//* Global Variables
const modal = document.querySelector(".modal");
const editModalBtn = document.querySelector(".modify");
const editModal = modal.querySelector("#editGallery");
const closeModalBtn = modal.querySelectorAll(".fa-xmark");

//* Event listener for edit modal button click
editModalBtn.addEventListener("click", (e) => {
   e.preventDefault();
   connect();
   modal.style.display = "flex";
});

//* Event listeners for close modal buttons
closeModalBtn.forEach((closeModalBtn) => {
   closeModalBtn.addEventListener("click", (e) => {
      closeModal();
   });
});

//* Event listener for keydown event (Esc key)
document.addEventListener("keydown", (e) => {
   if (e.key === "Escape") {
      closeModal();
   }
});

//* Function to fetch works data
async function connect() {
   const id = "works";

   try {
      const works = await fetchEndPoint(id);

      generateProjectsOnModal(works);
   } catch (error) {
      console.error(error);
   }
}

//* Function to close the modal
function closeModal() {
   modal.style.display = "none";
   editModal.style.display = "flex";
   addPictureModal.style.display = "none";
   document.getElementById("title").value = "";
   document.getElementById("selectCategory").selectedIndex = 0;
   document.getElementById("photo").value = null;
   document.querySelector("#picturePreviewImg").src = null;
   document.querySelector("#picturePreview").style.display = "none";
   document.querySelector("#labelPhoto").style.display = "flex";
}

//* Function to generate projects in the modal
function generateProjectsOnModal(works) {
   const sectionProjects = editModal.querySelector(".modalContent");
   sectionProjects.innerHTML = "";

   // Loop through each work and create project elements
   works.forEach((project) => {
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
   });

   deleteProjects();
}

/* document.addEventListener("click", (e) => {
   e.preventDefault();
   if (!modal.contains(e.target) && modal.style.display === "flex") {
      console.log("yes"); // Appeler la fonction closeModal si l'élément cliqué est en dehors du modal
   }
});  */

//*********** Modal #editGallery ***********//
//* Modal #editGallery Variables
const addPictureModal = modal.querySelector("#addPicture");
const addPictureModalBtn = modal.querySelector("#addPictureBtn");

//* Event listener for add picture modal button click
addPictureModalBtn.addEventListener("click", (e) => {
   e.preventDefault();
   editModal.style.display = "none";
   addPictureModal.style.display = "flex";
   generateFiltersOnModal();
});

//* Function to set up delete buttons for each project
function deleteProjects() {
   const deleteButtons = modal.querySelectorAll(".fa-trash-can");

   deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
         e.preventDefault();
         const id = e.target.dataset.id;
         deleteWork(id);
         sessionStorage.removeItem("works");
         closeModal();
      });
   });
}

//* Function to delete a work
function deleteWork(id) {
   let token = sessionStorage.getItem("token");

   // Sending DELETE request to delete the specified work
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
         closeModal();
      }
   });
}

//*********** Modal #addPictureBtn ***********//
//* Modal #addPictureBtn Variables
const pictureInput = modal.querySelector("#photo");
const newWorkFormSubmit = modal.querySelector("#validate");
const goingBack = modal.querySelector(".fa-arrow-left");
const picturePreviewClick = document.getElementById("picturePreview");

//* Event listener for change in picture input
pictureInput.addEventListener("change", (e) => {
   e.preventDefault();
   picturePreview();
});

//* Event listener for picture preview click (going back on the first modal)
goingBack.addEventListener("click", (e) => {
   e.preventDefault();
   editModal.style.display = "flex";
   addPictureModal.style.display = "none";
});

//* Event listener for change in picture input
picturePreviewClick.addEventListener("click", () => {
   document.getElementById("photo").click();
});

//* Event listener for form submission to post new work
newWorkFormSubmit.addEventListener("click", (e) => {
   e.preventDefault();
   postNewWork();
});

//* Event listener for change in add picture modal
addPictureModal.addEventListener("change", (e) => {
   e.preventDefault();
   changeSubmitBtnColor();
});

//* Function to post new work data
function postNewWork() {
   let token = sessionStorage.getItem("token");
   const select = document.getElementById("selectCategory");
   const title = document.getElementById("title").value;
   const categoryName = select.options[select.selectedIndex].innerText;
   const categoryId = select.options[select.selectedIndex].id;
   const image = document.getElementById("photo").files[0];
   let isValid = formValidation(image, title, categoryId);

   // Check if form data is valid
   if (isValid === true) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("category", categoryId);
      sendNewData(token, formData, title, categoryName);
   }
}

//* Function to send new work data to the server
function sendNewData(token, formData, title) {
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

      .then(() => {
         document.querySelector(".modal").style.display = "none";
         sessionStorage.removeItem("works");
         location.reload();
      })
      .catch((error) => console.error("Erreur:", error));
}

//* Function to validate form fields
function formValidation(image, title, categoryId) {
   if (image === undefined || title.trim().length === 0 || categoryId === "") {
      alert("Veuillez remplir tous les champs");
      return false;
   } else {
      return true;
   }
}

//* Function to preview selected image
function picturePreview() {
   const [file] = pictureInput.files;

   if (file) {
      document.querySelector("#picturePreviewImg").src =
         URL.createObjectURL(file);
      document.querySelector("#picturePreview").style.display = "flex";
      document.querySelector("#labelPhoto").style.display = "none";
   }
}

//* Function to change submit button color based on form validation
function changeSubmitBtnColor() {
   const select = document.getElementById("selectCategory");

   if (
      document.getElementById("title").value !== "" &&
      document.getElementById("photo").files[0] !== undefined &&
      select.options[select.selectedIndex].id !== ""
   ) {
      newWorkFormSubmit.classList.add("active");
   } else {
      newWorkFormSubmit.classList.remove("active");
   }
}
