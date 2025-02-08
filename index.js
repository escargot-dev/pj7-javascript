// gerer les images dans une page index.html avec les btn-filtres  
  function filtrePhotoByCategory(idCategorie) {
    fetch("http://localhost:5678/api/works", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const gallery = document.querySelector(".gallery");

      let resultat = "";

      if (idCategorie !== 0) {
        data = data.filter((photo) => photo.categoryId === idCategorie);
      }
 
      data.forEach((element) => {
        resultat += `<figure>
                         <img src="${element.imageUrl}" alt="${element.title}">
                         <figcaption>${element.title}</figcaption>
                     </figure>`;
      });

      gallery.innerHTML = resultat;
    })
    .catch((error) => {
      console.log("Impossible de récupéerer les works depuis le backend");
    });
}
// gerer les images sur le modal 1 
function getAllPhotos() {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const gallery = document.querySelector(".modifierGallery");

      let resultat = "";

      data.forEach((element) => {
        resultat += `<div class="gallery-item" id="${element.id}">
                      <img src="${element.imageUrl}" alt="${element.title}">
                      <button class="trash-btn"><i class="fa-solid fa-trash-can"></i></button>
					          </div>`;
      });

      gallery.innerHTML = resultat;
    })
    .catch((error) => {
      console.log(error);
    });
}
getAllPhotos();



// affichage ITEMS apres login  
function affichagefiltre() {
  const btnFiltre = document.getElementById("boutonFiltre")
    console.log("btnFiltre trouvé :", btnFiltre);

  if (localStorage.getItem("authToken") !== null) {
    btnFiltre.style.display = "none";
  } else {
    btnFiltre.style.display = "block";
  }
}

function affichageBtnModifier() {
  const btnModifier = document.getElementById("openModalBtn")
  if (localStorage.getItem("authToken") !== null) {
    btnModifier.style.display = "block";
  } else {
    btnModifier.style.display = "none";
  }
}

function affichageLogout() {
  if (localStorage.getItem("authToken") !== null) { 
    document.querySelector(".textLogout").innerText = "logout";
  }else {
    document.querySelector(".textLogout").innerText = "login";
  }
}
function affichageModeEdition (){
  if (localStorage.getItem("authToken") !== null) { 
    document.querySelector(".edit-icon").style.display = "block";
  }else {
    document.querySelector(".edit-icon").style.display = "none";
  }}

affichagefiltre();
filtrePhotoByCategory(0);
affichageBtnModifier();
affichageLogout();
affichageModeEdition ();