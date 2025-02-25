
function collectionDonnées() {
    const nom = document.getElementById("nom").value.trim();
    const age = document.getElementById("age").value.trim();
    const titre = document.getElementById("titre").value.trim();
    const description = document.getElementById("description").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const entreprise = document.getElementById("entreprise").value.trim();
    const poste = document.getElementById("poste").value.trim();
    const duree = document.getElementById("duree").value.trim();
    const missions = document.getElementById("missions").value.trim();
    const diplome = document.getElementById("diplome").value.trim();
    const etablissement = document.getElementById("etablissement").value.trim();
    const annee = document.getElementById("annee").value.trim();
    const competence = document.getElementById("competence").value.trim();
    const niveau = document.getElementById("niveau").value.trim();
    const loisir = document.getElementById("loisir").value.trim();
    const langue = document.getElementById("langue").value.trim();
    const niveauLangue = document.getElementById("niveauLangue").value.trim();
    const photoFile = document.getElementById("photo").files[0];
}

function genererPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();


    const data = collectionDonnées();
    if (!data) return; 

    if (data.photo) {
        const img = new Image();
        img.src = data.photo;
        img.onload = function () {
            doc.addImage(img, "JPEG", 15, 15, 30, 30); 
            ajouterContenuPDF(doc, data); 
        };
    } else {
        ajouterContenuPDF(doc, data); 
    }
}
   

