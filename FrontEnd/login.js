
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
          //si utilisateur inconnu dans la base
          if (response.status === 404 ) {
            alert("User not found");
            //si les deux champs ne matchent pas
          } else if (response.status === 401) {
            alert("Unauthorized");
            //si status 200 on stocke les donnees dans le json
          } else if (response.ok) {
            return response.json();
          }
        })
        .then((user) => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('userId', user.userId);
          window.location.href = './index.html';
        })
});