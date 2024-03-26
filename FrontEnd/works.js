let works = window.localStorage.getItem("works")

if (works === null){
    const reponse = await fetch("http://localhost:5678/api/works");
    let works = await reponse.json();
    const valueWorks = JSON.stringify(works);
    window.localStorage.setItem("works", valueWorks);
    
}else{
    works = JSON.parse(works);
}

function generateProjects(works){
    for (let i = 0; i < works.length; i++) {
        const project = works[i];
        const sectionProjects = document.querySelector(".gallery");
        const projectElement = document.createElement("figure");
        projectElement.dataset.id = project.id;
        const projectImage = document.createElement("img");
        projectImage.src = project.imageUrl;
        const projectCaption = document.createElement("figcaption");
        projectCaption.innerText = project.title;
        
        sectionProjects.appendChild(projectElement);
        projectElement.appendChild(projectImage);
        projectElement.appendChild(projectCaption);

      }
}

generateProjects(works);