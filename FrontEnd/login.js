
document.addEventListener("submit", (e) => {
    e.preventDefault();
    let user = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
    };

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), //on POST les données de user dans le JSON
      })
        //on récupère la réponse
        .then((response) => {
          //si status 200 on stocke les donnees dans le json
          if (response.ok) {
            return response.json();
            //si les deux champs ne matchent pas
          } else if (response.status === 401) {
            console.log("Unauthorized");
            //si utilisateur inconnu dans la base
          } else if (response.status === 404) {
            console.log("User not found");
          }
        })
    
    
  
});