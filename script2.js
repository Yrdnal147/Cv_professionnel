//cette fonction récupère toutes les  des champs du
// formulaire et les affiche dans la prévisualisation

function updatePreview() {
  document.getElementById("cv-name").innerText = document.getElementById("name").value || "Votre Nom";
  document.getElementById("cv-email").innerText = document.getElementById("email").value || "Votre Email";
  document.getElementById("cv-phone").innerText = document.getElementById("phone").value || "Votre Téléphone";
  document.getElementById("cv-description").innerText = document.getElementById("description").value || "Votre description...";
}
//cette fonction permet d'ajouter un champ à partir de son identifiant(id)
//  et de mettre à jour la prévisualisation du cv tout en ajoutant le champ ajouté
//dans la prévisualisation
function addField(sectionId, placeholders, previewId) {
  const container = document.getElementById(sectionId);
  const div = document.createElement("div");
  div.className = "mt-2 p-2 border rounded bg-gray-100";

  placeholders.forEach(placeholder => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.className = "w-full p-2 border rounded mt-2";
    input.oninput = function() { updateDynamicPreview(sectionId, previewId); };
    div.appendChild(input);
  });

  container.appendChild(div);
  updateDynamicPreview(sectionId, previewId);
  toggleRemoveButton(sectionId);
}

//cette fonction permet de supprimer un champ à partir de son identifiant(id)
//  et de mettre à jour la prévisualisation du cv tout en retirant le champ supprimé
//et en enlevant le bouton de suppression si la section ne contient plus qu'un champ
// cette fonction oblige l'utilisateur à avoir au moins un champ dans une section
function removeField(sectionId, previewId) {
  const container = document.getElementById(sectionId);
  if (container.children.length > 1) {
    container.removeChild(container.lastChild);
    updateDynamicPreview(sectionId, previewId);
    toggleRemoveButton(sectionId);
  }
}

//cette fonction permet de retirer le bouton quand
//  dans une section il n'a au moins un champ 
//ca oblige l'utilisateur à avoir au moins une experience utilisateur
function toggleRemoveButton(sectionId) {
  const container = document.getElementById(sectionId);
  const removeButton = document.getElementById("remove-" + sectionId);
  removeButton.style.display = container.children.length =1 ? "inline-block" : "none";
}
//cette fonction permet de mettre à jour le contenu dynamique de la prévisualisation
//  à partir des valeurs des champs du formulaire
//et de les afficher dans la prévisualisation
function updateDynamicPreview(sectionId, previewId) {
  const container = document.getElementById(sectionId);
  const previewContainer = document.getElementById(previewId);
  previewContainer.innerHTML = "";

  Array.from(container.children).forEach(div => {
    const values = Array.from(div.children)
      .filter(input => input.tagName === "INPUT")
      .map(input => input.value)
      .filter(value => value.trim() !== "");

    if (values.length > 0) {
      const p = document.createElement("p");
      p.className = "mt-2 text-gray-700";
      p.innerText = values.join(" - ");
      previewContainer.appendChild(p);
    }
  });
}
//cette fonction permet de générer un fichier pdf à partir de
//  la prévisualisation du cv à l'aide de la librairie jsPDF et html2canvas
//  qui utilse l'url de l'image de la prévisualisation pour générer le pdf
  function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4'); 


   html2canvas(document.getElementById('cv-preview')).then(canvas => {
    const imgData = canvas.toDataURL('image/png'); 
  const imgWidth = 210; 
   const imgHeight = (canvas.height * imgWidth) / canvas.width; 
    // function generatePDF() {
    //     html2pdf()
    //       .from(document.getElementById('cv-preview'))
    //       .save('cv.pdf');
    //   }
      
    
   doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.save('cv.pdf'); 
  });
 }

 //cette fonction permet de mettre à jour la photo de profil grace à un
 //  événement qui est déclenché lorsqu'on choisit une photo et qu'on la charge
function updateProfilePic(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profile-pic').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
