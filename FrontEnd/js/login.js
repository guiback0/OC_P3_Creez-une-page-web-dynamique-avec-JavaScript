//* Adding an event listener for the 'submit' event on the document

document.addEventListener("submit", (e) => {
   e.preventDefault();

   let user = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
   };

   fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            const loginError = document.querySelector(".loginErrorMessage");
            loginError.innerText = "Email ou mot de passe incorect";
         }
      })

      .then((user) => {
         sessionStorage.setItem("token", user.token);
         sessionStorage.setItem("userId", user.userId);
         window.location.href = "./index.html";
      });
});
