//cette fonction récupère toutes les  des champs du
// formulaire et les affiche dans la prévisualisation(met à jour la prévisualisation)

function updatePreview() {
    const nom = document.getElementById("cv-name").innerText = document.getElementById("name").value || "Votre Nom";
    const titre = document.getElementById("cv-title").innerText = document.getElementById("title").value || "Titre du poste";
    const description = document.getElementById("cv-description").innerText = document.getElementById("description").value || "Votre description...";
    const email = document.getElementById("cv-email").innerText = document.getElementById("email").value || "Votre Email";
    const phone = document.getElementById("cv-phone").innerText = document.getElementById("phone").value || "Votre Téléphone";
    const age = document.getElementById("cv-age").innerText = document.getElementById("age").value ? `${document.getElementById("age").value} ans` : "Âge non renseigné";
    const genre = document.getElementById("cv-gender").innerText = document.getElementById("gender").value || "Genre";
    const situation = document.getElementById("cv-situation").innerText = document.getElementById("situation").value || "Situation actuelle";
    const address = document.getElementById("cv-address").innerText = document.getElementById("adresse").value || "Situation actuelle";
    // Ici Mise à jour des listes dynamiques
    updateListPreview("experience-container", "cv-experience");
    updateListPreview("education-container", "cv-education");
    updateListPreview("skills-container", "cv-skills");
    updateListPreview("languages-container", "cv-languages");
    updateListPreview("interests-container", "cv-interests");
    updateListPreview("references-container", "cv-references");

    if (!nom || !age || !titre || !description || !address || !email || !phone || !genre) {
        alert("Veuillez remplir tous les champs obligatoires (Nom, Âge, Titre, email, Téléphone).");
        return null;
    }

    if (age < 18 || age > 65) {
        alert(" L'âge doit être compris entre 18 et 65 ans.");
        return null;
    }


}
// if (!validateEmail(email)) {
//     alert("Veuillez entrer une adresse e-mail valide.");
//     return null;
// }

// if (!validatePhone(telephone)) {
//     alert("Veuillez entrer un numéro de téléphone valide  de (9 chiffres).");
//     return null;
// }

// return {
//     nom, age, titre, description, email, telephone, adresse, entreprise, poste, duree, missions,
//     diplome, etablissement, annee, competence, niveau, loisir, langue, niveauLangue,
//     photo: photoFile ? URL.createObjectURL(photoFile) : null
// };

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function validatePhone(phone) {
    return /^\d{9}$/.test(phone);
}





//cette fonction permet d'ajouter un champ à partir de son identifiant(id)
//  et de mettre à jour la prévisualisation du cv tout en ajoutant le champ ajouté
//dans la prévisualisation
function addField(sectionId, labels, previewId) {
    const container = document.getElementById(sectionId);
    const div = document.createElement("div");
    div.className = "mt-2 space-y-2";

    labels.forEach(label => {
        const labelElement = document.createElement("label");
        labelElement.textContent = label;
        labelElement.className = "block text-gray-700 font-semibold";

        const input = document.createElement("input");
        input.className = "w-full p-2 border rounded";
        input.type = label.toLowerCase().includes("date") ? "date" : "text";

        input.oninput = function () {
            updateDynamicPreview(sectionId, previewId);
        };

        div.appendChild(labelElement);
        div.appendChild(input);
    });

    container.appendChild(div);
    updateDynamicPreview(sectionId, previewId);
    toggleRemoveButton(sectionId);
}

function removeField(sectionId, previewId) {
    const container = document.getElementById(sectionId);
    const inputs = container.querySelectorAll("input");

    if (inputs.length > 1) {
        const lastInputDiv = inputs[inputs.length - 1].parentElement;
        container.removeChild(lastInputDiv);
        updateDynamicPreview(sectionId, previewId);
        toggleRemoveButton(sectionId);
    }
}

function updateListPreview(containerId, previewId) {
    const container = document.getElementById(containerId);
    const preview = document.getElementById(previewId);
    preview.innerHTML = "";

    const items = container.querySelectorAll("input, textarea, select");
    let content = "";
    items.forEach((item) => {
        if (item.value.trim()) {
            content += `<p>${item.value}</p>`;
        }
    });

    preview.innerHTML = content || "<p>Aucune donnée renseignée</p>";
}

function validateDates() {
    const experienceDates = document.querySelectorAll('#experience-container input[type="date"]');
    for (const dateInput of experienceDates) {
        if (dateInput.value && !isValidDate(dateInput.value)) {
            alert("Veuillez entrer une date valide pour l'expérience professionnelle.");
            return false;
        }
    }

    const educationDates = document.querySelectorAll('#education-container input[type="date"]');
    for (const dateInput of educationDates) {
        if (dateInput.value && !isValidDate(dateInput.value)) {
            alert("Veuillez entrer une date valide pour la formation.");
            return false;
        }
    }

    return true;
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

function addField(sectionId, labels, previewId) {
    const container = document.getElementById(sectionId);
    const div = document.createElement("div");
    div.className = "mt-2 space-y-2";

    labels.forEach(label => {
        const labelElement = document.createElement("label");
        labelElement.textContent = label;
        labelElement.className = "block text-gray-700 font-semibold";

        const input = document.createElement("input");
        input.className = "w-full p-2 border rounded";
        input.type = label.toLowerCase().includes("date") ? "date" : "text";

        input.oninput = function () {
            updateDynamicPreview(sectionId, previewId);
        };

        div.appendChild(labelElement);
        div.appendChild(input);
    });

    container.appendChild(div);
    updateDynamicPreview(sectionId, previewId);
    toggleRemoveButton(sectionId);
}

function removeField(sectionId, previewId) {
    const container = document.getElementById(sectionId);
    const inputs = container.querySelectorAll("input");

    if (inputs.length > 1) {
        const lastInputDiv = inputs[inputs.length - 1].parentElement;
        container.removeChild(lastInputDiv);
        updateDynamicPreview(sectionId, previewId);
        toggleRemoveButton(sectionId);
    }
}

function toggleRemoveButton(sectionId) {
    const container = document.getElementById(sectionId);
    const removeButton = document.getElementById("remove-" + sectionId);

    if (removeButton) {
        const inputCount = container.querySelectorAll("input").length;
        removeButton.style.display = inputCount > 1 ? "inline-block" : "none";
    }
}

function updateDynamicPreview(sectionId, previewId) {
    const container = document.getElementById(sectionId);
    const previewContainer = document.getElementById(previewId);
    previewContainer.innerHTML = "";

    Array.from(container.children).forEach(div => {
        const values = Array.from(div.children)
            .filter(input => input.tagName === "INPUT")
            .map(input => input.value.trim())
            .filter(value => value !== "");

        if (values.length > 0) {
            const p = document.createElement("p");
            p.className = "mt-2 text-gray-700";

            if (sectionId === "skills-container") {
                const [competence, niveau] = values;
                p.innerHTML = `
                    <strong>${competence || "Compétence"}</strong> - ${niveau || "Niveau de maîtrise"}
                `;
            } else if (sectionId === "education-container") {
                let [diplome, etablissement, dateDebut, dateFin] = values;
                dateDebut = dateDebut ? new Date(dateDebut).toLocaleDateString("fr-FR") : "N/A";
                dateFin = dateFin ? new Date(dateFin).toLocaleDateString("fr-FR") : "N/A";
                p.innerHTML = `
                    <strong>${diplome || "Diplôme"}</strong> - ${etablissement || "Établissement"}<br>
                    <em>${dateDebut} - ${dateFin}</em>
                `;
            } else if (sectionId === "interests-container") {
                const [interet] = values;
                p.innerHTML = `
                    <strong>${interet || "Centre d’intérêt"}</strong>
                `;
            } else if (sectionId === "references-container") {
                const [nom, poste, contact] = values;
                p.innerHTML = `
                    <strong>${nom || "Nom"}</strong> - ${poste || "Poste"}<br>
                    <em>${contact || "Contact"}</em>
                `;
            } else if (sectionId === "languages-container") {
                const [langue, niveau] = values;
                p.innerHTML = `
                    <strong>${langue || "Langue"}</strong> - ${niveau || "Niveau de compétence"}
                `;
            } else {
                p.innerText = values.join(" - ");
            }

            previewContainer.appendChild(p);
        }
    });
}

// function generatePDF() {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF('p', 'mm', 'a4');

//     html2canvas(document.getElementById('cv-preview')).then(canvas => {
//         const imgData = canvas.toDataURL('image/png');
//         const imgWidth = 210;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//         doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//         doc.save('cv.pdf');
//     });
// }


function updateProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-pic-preview').src = e.target.result;
            document.getElementById('profile-pic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function toggleRemoveButton(sectionId) {
    const container = document.getElementById(sectionId);
    const removeButton = document.getElementById("remove-" + sectionId);

    if (removeButton) {
        const inputCount = container.querySelectorAll("input").length;
        removeButton.style.display = inputCount > 1 ? "inline-block" : "none";
    }
}

//cette fonction permet de mettre à jour le contenu dynamique de la prévisualisation
//  à partir des valeurs des champs du formulaire
//et de les afficher dans la prévisualisation
// function updateDynamicPreview(sectionId, previewId) {
//   const container = document.getElementById(sectionId);
//   const previewContainer = document.getElementById(previewId);
//   previewContainer.innerHTML = "";

//   Array.from(container.children).forEach(div => {
//     const values = Array.from(div.children)
//       .filter(input => input.tagName === "INPUT")
//       .map(input => input.value)
//       .filter(value => value.trim() !== "");

//     if (values.length > 0) {
//       const p = document.createElement("p");
//       p.className = "mt-2 text-gray-700";
//       p.innerText = values.join(" - ");
//       previewContainer.appendChild(p);
//     }
//   });
//}
//cette fonction permet de générer un fichier pdf à partir de
//  la prévisualisation du cv à l'aide de la librairie jsPDF et html2canvas
//  qui utilse l'url de l'image de la prévisualisation pour générer le pdf
//   function generatePDF() {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF('p', 'mm', 'a4'); 


//    html2canvas(document.getElementById('cv-preview')).then(canvas => {
//     const imgData = canvas.toDataURL('image/png'); 
//   const imgWidth = 210; 
//    const imgHeight = (canvas.height * imgWidth) / canvas.width; 
//    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//     doc.save('cv.pdf'); 
//   });
//  }

function generatePDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');



    html2canvas(document.getElementById('cv-preview')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save('cv.pdf');
    });
}



//cette fonction permet de mettre à jour la photo de profil grace à un
//  événement qui est déclenché lorsqu'on choisit une photo et qu'on la charge
//  function updateProfilePic(event) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function (e) {

//         document.getElementById('profile-pic-preview').src = e.target.result;

//         document.getElementById('profile-pic').src = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//cette fonction permet de sauvegarder
//  les données de l'utilisateur sur le navigateur

function updateDynamicPreview(sectionId, previewId) {
    const container = document.getElementById(sectionId);
    const previewContainer = document.getElementById(previewId);
    previewContainer.innerHTML = ""; // Réinitialiser avant de remplir

    Array.from(container.children).forEach(div => {
        const values = Array.from(div.children)
            .filter(input => input.tagName === "INPUT")
            .map(input => input.value.trim())
            .filter(value => value !== "");

        if (values.length > 0) {
            const p = document.createElement("p");
            p.className = "mt-2 text-gray-700";

            if (sectionId === "skills-container") {
                // Formatage spécifique pour les compétences
                const [competence, niveau] = values;
                p.innerHTML = `
                    <strong>${competence || "Compétence"}</strong> - ${niveau || "Niveau de maîtrise"}
                `;
            } else if (sectionId === "education-container") {
                // Formatage spécifique pour les formations
                let [diplome, etablissement, dateDebut, dateFin] = values;
                dateDebut = dateDebut ? new Date(dateDebut).toLocaleDateString("fr-FR") : "N/A";
                dateFin = dateFin ? new Date(dateFin).toLocaleDateString("fr-FR") : "N/A";
                p.innerHTML = `
                    <strong>${diplome || "Diplôme"}</strong> - ${etablissement || "Établissement"}<br>
                    <em>${dateDebut} - ${dateFin}</em>
                `;
            } else if (sectionId === "interests-container") {
                // Formatage spécifique pour les centres d’intérêt
                const [interet] = values;
                p.innerHTML = `
                    <strong>${interet || "Centre d’intérêt"}</strong>
                `;
            } else if (sectionId === "references-container") {
                // Formatage spécifique pour les références
                const [nom, poste, contact] = values;
                p.innerHTML = `
                    <strong>${nom || "Nom"}</strong> - ${poste || "Poste"}<br>
                    <em>${contact || "Contact"}</em>
                `;
            } else if (sectionId === "languages-container") {
                // Formatage spécifique pour les langues
                const [langue, niveau] = values;
                p.innerHTML = `
                    <strong>${langue || "Langue"}</strong> - ${niveau || "Niveau de compétence"}
                `;
            } else {
                // Formatage par défaut pour les autres sections
                p.innerText = values.join(" - ");
            }

            previewContainer.appendChild(p);
        }
    });
}

// Sauvegarde les donnees dans le Local Storage
function saveData() {
    const cvData = {
        nom: document.getElementById("cv-name").value(),
        titre: document.getElementById("cv-title").value(),
        description: document.getElementById("cv-description").value(),
        email: document.getElementById("cv-email").value(),
        phone: document.getElementById("cv-phone").value(),
        age: document.getElementById("cv-age").value(),
        genre: document.getElementById("cv-gender").value(),
        situation: document.getElementById("cv-situation").value(),
        address: document.getElementById("cv-address").value(),
        // Ici Mise à jour des listes dynamiques
        // updateListPreview("experience-container", "cv-experience")
        // updateListPreview("education-container", "cv-education");
        // updateListPreview("skills-container", "cv-skills");
        // updateListPreview("languages-container", "cv-languages");
        // updateListPreview("interests-container", "cv-interests");
        // updateListPreview("references-container", "cv-references"),

    }



    localStorage.setItem('cvData', JSON.stringify(cvData)); // Sauvegarde les donnees
};
document.getElementById("name, age,").addEventListener("input", saveData);

// Charge les donnees sauvegarders depuis le Local Storage
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('cvData')); // Recuperer les donnees sauvegardees
    if (savedData) {
        // Mettre a jour les champs avec les donnees sauvegardees
        $('#nom').val(savedData.nom);
        $('#experience').val(savedData.experience);
        if (savedData.image) {
            $('#cv-image').attr('src', savedData.image).removeClass('hidden');
        }
        $('#email').val(savedData.email);
        $('#tel').val(savedData.tel);
        $('#adresse').val(savedData.adresse);
        $('.entreprise').val(savedData.entreprise);
        $('#age').val(savedData.age);
        $('#titre').val(savedData.titre);
        $('#sexe').val(savedData.sexe);
        $('#a-propos').val(savedData.a_propos);
        $('#nom-reference').val(savedData.nom_reference);
        $('#poste-reference').val(savedData.poste_reference);
        $('#contact-reference').val(savedData.contact_reference);
        $('#situation').val(savedData.situation);
        $('#ville').val(savedData.ville);
        $('.poste').val(savedData.poste);
        $('#diplome').val(savedData.diplome);
        $('#etablissement').val(savedData.etablissement);
        $('#annee-obtention').val(savedData.annee_obtention);
        $('.description').val(savedData.description);
        $('.date-debut').val(savedData.date_debut);
        $('.date-fin').val(savedData.date_fin);
        $('#competence').val(savedData.competence);
        $('#langues').val(savedData.langues);
        $('#niveau').val(savedData.niveau);
        $('#loisir').val(savedData.loisir);
        $('.ville').val(savedData.ville_2);
        updateCVPreview();
    }
}
