function fetchPhotos(callback) {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderGallery(data, containerSelector, filterId = null) {
  const container = document.querySelector(containerSelector);
  let resultat = "";

  if (filterId !== null) {
    data = data.filter((photo) => photo.categoryId === filterId || filterId === 0);
  }

  data.forEach((element) => {
    if (containerSelector === ".gallery") {
      resultat += `<figure>
                     <img src="${element.imageUrl}" alt="${element.title}">
                     <figcaption>${element.title}</figcaption>
                   </figure>`;
    } else if (containerSelector === ".modifierGallery") {
      resultat += `<div class="gallery-item" id="${element.id}">
                    <img src="${element.imageUrl}" alt="${element.title}">
                    <button class="trash-btn"><i class="fa-solid fa-trash-can"></i></button>
                  </div>`;
    }
  });

  container.innerHTML = resultat;
}

// Fonction pour filtrer les images dans index.html
function filtrePhotoByCategory(idCategorie) {
  fetchPhotos((data) => {
    renderGallery(data, ".gallery", idCategorie);
  });
}

// Fonction pour afficher toutes les images dans la modale
function getAllPhotos() {
  fetchPhotos((data) => {
    renderGallery(data, ".modifierGallery");
  });
}

// Charger les images pour la modale au chargement de la page
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