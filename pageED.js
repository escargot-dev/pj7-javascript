const openModalBtn = document.getElementById('openModalBtn');
  const modal1 = document.getElementById('modal1');
  const modal2 = document.getElementById('modal2');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModal1 = document.getElementById('closeModal1');
  const closeModal2 = document.getElementById('closeModal2');
  const ajoutePhotoBtn = document.getElementById('ajouteModalBtn');
  const backToModal1 = document.getElementById('backModal1');
  const btnValide = document.getElementById('submitImage');

  // Ouvrir le premier modale
  openModalBtn.addEventListener('click', () => {
    modal1.style.display = 'block';
    modalOverlay.style.display = 'block';
  });

  // Ouvrir le deuxième modale depuis le premier
  ajoutePhotoBtn.addEventListener('click', () => {
    modal1.style.display = 'none';
    modal2.style.display = 'block';
  });

  // Revenir au premier modale
  backToModal1.addEventListener('click', () => {
    modal2.style.display = 'none';
    modal1.style.display = 'block';
  });

  // Fermer les modales
  [closeModal1, closeModal2, modalOverlay].forEach(element => {
    element.addEventListener('click', () => {
      modal1.style.display = 'none';
      modal2.style.display = 'none';
      modalOverlay.style.display = 'none';
    });
  });

//événements pour supprimer les images 
document.querySelector(".modifierGallery").addEventListener("click", function (e) {
  if (e.target.closest(".trash-btn")) {

    const galleryItem = e.target.closest(".gallery-item");
    const imageId = galleryItem.getAttribute("id");
    // Afficher la confirmation avant de supprimer
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
    if (confirmation) {
      // Requête DELETE vers l'API pour supprimer l'image en base de données
        fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de la suppression en base de données");
        }
        return response.status === 204 ? null : response.json();
      })
      .then(() => {
        galleryItem.remove();
        location.reload();
        alert("L'image a bien été supprimée.");
      })

      .catch(error => {
        console.error(error);
      });
    }
  }
});


// evenement: ajouer les images et btn valide 
const fileInput = document.getElementById('file-input');
const titleInput = document.getElementById('title-input');
const categoryInput = document.getElementById('categoryId-input');
const photoUploadZone = document.getElementById('photo-upload');

  document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("upload-btn"); // Bouton d'ajout
  
    uploadButton.addEventListener("click", function () {
      fileInput.click(); // Déclenche l'input file au clic du bouton
    });

    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
  

            // Vider la zone et ajouter l'image
            photoUploadZone.innerHTML = "";
            photoUploadZone.appendChild(img);

        };
          reader.readAsDataURL(file);
      } else {
        alert("Veuillez sélectionner une image valide.");
      }
    });
  });

 
  btnValide.addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
  
    // Vérifier si tous les champs sont remplis
    if (!fileInput.files[0] || !titleInput.value || !categoryInput.value) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
  
    // Création du formulaire pour envoyer l'image et ses infos
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categoryInput.value);
  
    fetch(`http://localhost:5678/api/works`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      },
      body: formData
    })
      .then((response) => response.json())
      .then((newImage) => {
        console.log("Réponse du serveur :", newImage);
        // Fermer le modal
        modal2.style.display = "none";
        modalOverlay.style.display = "none";
  
        // Réinitialiser les champs du formulaire
        fileInput.value = "";
        titleInput.value = "";
        categoryInput.value = "";
        photoUploadZone.innerHTML = ""; // Supprimer l'aperçu
  
        // Ajouter la nouvelle image à la galerie
        addImageToGallery(newImage);
      })
      .catch((error) => console.error(error));
  });
  // Fonction pour ajouter une nouvelle image à la galerie
function addImageToGallery(imageData) {
  const gallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  
  const img = document.createElement("img");
  img.src = imageData.imageUrl;
  img.alt = imageData.title;
  
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = imageData.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

  
