function updatePreview() {
    const nameValue = document.getElementById("name").value.trim() || "Votre Nom";
    const titleValue = document.getElementById("title").value.trim() || "Titre du poste";
    const descriptionValue = document.getElementById("description").value.trim() || "Votre description...";
    const emailValue = document.getElementById("email").value.trim() || "Votre Email";
    const phoneValue = document.getElementById("phone").value.trim() || "Votre Téléphone";
    const ageValue = document.getElementById("age").value.trim();
    const ageNumber = ageValue ? parseInt(ageValue, 10) : null;
    const genderValue = document.getElementById("gender").value.trim() || "Genre";
    const situationValue = document.getElementById("situation").value.trim() || "Situation actuelle";
    const addressValue = document.getElementById("adresse").value.trim() || "Adresse non renseignée";

    // Affectation aux éléments de prévisualisation
    document.getElementById("cv-name").innerText = nameValue;
    document.getElementById("cv-title").innerText = titleValue;
    document.getElementById("cv-description").innerText = descriptionValue;
    document.getElementById("cv-email").innerText = emailValue;
    document.getElementById("cv-phone").innerText = phoneValue;
    document.getElementById("cv-age").innerText = ageValue ? `${ageValue} ans` : "Âge non renseigné";
    document.getElementById("cv-gender").innerText = genderValue;
    document.getElementById("cv-situation").innerText = situationValue;
    document.getElementById("cv-address").innerText = addressValue;

    // Vérification des champs obligatoires
    if (!nameValue || !titleValue || !emailValue || !phoneValue || !ageValue) {
        alert("Veuillez remplir tous les champs obligatoires (Nom, Âge, Titre, Email, Téléphone).");
        return;
    }

    // Validation de l'âge
    if (ageNumber < 18 || ageNumber > 65) {
        alert("L'âge doit être compris entre 18 et 65 ans.");
        return;
    }

    // Validation de l'email
    if (!validateEmail(emailValue)) {
        alert("Veuillez entrer une adresse e-mail valide.");
        return;
    }

    // Validation du téléphone
    if (!validatePhone(phoneValue)) {
        alert("Veuillez entrer un numéro de téléphone valide (9 chiffres).");
        return;
    }

    // Mise à jour des sections dynamiques
    updateListPreview("experience-container", "cv-experience");
    updateListPreview("education-container", "cv-education");
    updateListPreview("skills-container", "cv-skills");
    updateListPreview("languages-container", "cv-languages");
    updateListPreview("interests-container", "cv-interests");
    updateListPreview("references-container", "cv-references");
}

// Fonction de validation de l'email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Fonction de validation du téléphone
function validatePhone(phone) {
    return /^\d{9}$/.test(phone);
}

// Mise à jour de la prévisualisation des sections dynamiques
function updateListPreview(containerId, previewId) {
    const container = document.getElementById(containerId);
    const preview = document.getElementById(previewId);
    preview.innerHTML = "";

    const fragment = document.createDocumentFragment();
    const items = container.querySelectorAll("input, textarea, select");

    items.forEach((item) => {
        if (item.value.trim()) {
            const p = document.createElement("p");
            p.textContent = item.value;
            fragment.appendChild(p);
        }
    });

    preview.appendChild(fragment);
}

// Ajouter un champ dynamique
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

// Supprimer un champ dynamique
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

// Basculer le bouton de suppression
function toggleRemoveButton(sectionId) {
    const container = document.getElementById(sectionId);
    const removeButton = document.getElementById("remove-" + sectionId);

    if (removeButton) {
        const inputCount = container.querySelectorAll("input").length;
        removeButton.style.display = inputCount > 1 ? "inline-block" : "none";
    }
}

// Générer le PDF
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

// Mise à jour de la photo de profil
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
