document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Empêche le rechargement de la page

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const userData = { email, password };

      try {
          const response = await fetch("http://localhost:5678/api/users/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(userData)
          });

          const data = await response.json();

          if (response.ok) {
              localStorage.setItem("authToken", data.token); // Stocke le token
              alert("Connexion réussie !");
              window.location.href = "./index.html"; // Redirection vers la page du site avec des boutons d’actions pour éditer le site. 
          } else {
              alert("Erreur : " + (data.message || "Erreur dans l’identifiant ou le mot de passe"));
          }
      } catch (error) {
          console.error("Erreur de connexion :", error);
          alert("Erreur dans l’identifiant ou le mot de passe");
      }
  });
});




