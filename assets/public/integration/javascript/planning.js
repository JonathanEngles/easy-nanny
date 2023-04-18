let enModification = false;
let tacheEnModification = null;

const jours = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "samedi"
];

const heures = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
];

// Fonction pour transformer le rgb en héxadecimale

function rgbToHex(rgb) {
    const match = rgb.match(/(\d+)/g);
    const hex = match.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    return `#${hex}`;
}


function arrondirHeure(heure) {
    const [heures, minutes] = heure.split(':');
    const minutesArrondies = Math.round(parseInt(minutes, 10) / 30) * 30;
    const heuresMaj = (minutesArrondies === 60) ? (parseInt(heures, 10) + 1) : parseInt(heures, 10);
    const minutesMaj = (minutesArrondies === 60) ? 0 : minutesArrondies;
    return `${heuresMaj.toString().padStart(2, '0')}:${minutesMaj.toString().padStart(2, '0')}`;
}

function ouvrirModaleAjout(jour) {
    enModification = false;
    $("#btnAjouter").remove();
    $("#btnSauvegarder").hide();
    $("#btnSupprimer").hide();
    modaleAjout.data("jour", jour);
    modaleAjout.dialog("open");
}

function creerTacheElement(tache) {
    const tacheElement = $("<div>")
        .addClass("tache")
        .css("background-color", tache.couleur)
        .text(tache.heure + " - " + tache.description)
        .attr("data-heure", tache.heureExacte);
    tacheElement.draggable({
        helper: "clone",
        zIndex: 1000,
        revert: "invalid",
        start: function (event, ui) {
            $(this).hide();
        },
        stop: function (event, ui) {
            $(this).show();
        },
    });
    tacheElement.on("dblclick", function () {
        const jour = $(this).closest(".jour").attr("id");
        const heure = $(this).text().split(" - ")[0];
        ouvrirModaleModification(jour, heure);
    });
    return tacheElement;
}

function creerPlanning() {
    jours.forEach((jour) => {
        const colonne = $("<div>").addClass("jour").attr("id", jour);

        const enTete = $("<div>").addClass("en-tete");
        enTete.append($("<span>").text(jour));
        const btnAjouter = $("<button>").addClass("icone").text("＋");
        btnAjouter.on("click", function () {
            ouvrirModaleAjout(jour);
        });
        enTete.append(btnAjouter);

        const taches = $("<div>").addClass("taches");

        heures.forEach((heure) => {
            const rangee = $("<div>").addClass("rangee");
            rangee.append($("<div>").addClass("heure").text(heure));
            rangee.append($("<div>").addClass("tache-conteneur"));
            taches.append(rangee);
        });

        colonne.append(enTete);
        colonne.append(taches);

        $("#planning").append(colonne);
    });
    initDragAndDrop();
}

function configurerModaleAjout() {
    modaleAjout = $("#modale").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Ajouter la tâche": ajouterTache,
            "Sauvegarder la tâche": sauvegarderTache,
            "Supprimer": supprimerTache,
            Annuler: function () {
                modaleAjout.dialog("close");
            },
        },
        open: function (event, ui) {
            if (enModification) {
                modaleAjout.dialog("option", "buttons", {
                    "Modifier la tâche": sauvegarderTache,
                    "Supprimer": supprimerTache,
                    Annuler: function () {
                        modaleAjout.dialog("close");
                    },
                });
                // Afficher les informations de la tâche existante
                const tache = modaleAjout.data("tache");
                $("#date").val(tache.date);
                $("#heure").val(tache.heure);
                $("#description").val(tache.description);
                $("#couleur").val(tache.couleur);
            } else {
                modaleAjout.dialog("option", "buttons", {
                    "Ajouter la tâche": ajouterTache,
                    Annuler: function () {
                        modaleAjout.dialog("close");
                    },
                });
            }
            // Cacher le bouton "Ajouter la tâche" si on est en mode modification
            if (enModification) {
                modaleAjout.find("#btnAjouter").hide();
            } else {
                modaleAjout.find("#btnAjouter").show();
            }
            // Afficher l'heure sélectionnée dans le titre de la modale
            const heure = $("#heure").val();
            modaleAjout.dialog("option", "title", "Événement " + heure);
        },
        close: function () {
            modaleAjout.find("form")[0].reset();
            enModification = false;
            modaleAjout.find("#btnAjouter").show(); // Afficher à nouveau le bouton "Ajouter la tâche"
        },
    });
    modaleAjout.find("form").on("submit", function (event) {
        event.preventDefault();
        if (enModification) {
            sauvegarderTache();
        } else {
            ajouterTache();
        }
    });

    $("#btnAjouter").on("click", ajouterTache);
    $("#btnSauvegarder").on("click", sauvegarderTache);
    $("#btnSupprimer").on("click", supprimerTache);

    creerPlanning();
}

function ouvrirModaleModification(jour, heure) {
    enModification = true;
    modaleAjout.dialog("option", "buttons", {
        "Sauvegarder la tâche": sauvegarderTache,
        "Supprimer": supprimerTache,
        Annuler: function () {
            modaleAjout.dialog("close");
        },
    });

    // Récupérer les informations de la tâche à modifier
    const colonne = $("#" + jour);
    const rangee = colonne.find(".rangee").filter(function () {
        return $(this).find(".heure").text() === heure;
    });
    const tacheElement = rangee.find(".tache");
    const tache = {
        jour: jour,
        heure: heure,
        description: tacheElement.text().split(" - ")[1],
        couleur: rgbToHex(tacheElement.css("background-color")),
    };
    
    // Enregistrer les informations de la tâche dans la modale
    modaleAjout.data("tache", tache);

    // Pré-remplir le formulaire avec les informations de la tâche
    $("#date").val(tache.date);
    $("#heure").val(tache.heure);
    $("#description").val(tache.description);
    $("#couleur").val(tache.couleur);

    // Ouvrir la modale de modification
    modaleAjout.dialog("open");
}

// Ajouter la tâche
function ajouterTache() {
    const tache = {
        date: $("#date").val(),
        heure: arrondirHeure($("#heure").val()), 
        description: $("#description").val(),
        couleur: $("#couleur").val(),
    };

    const colonne = $("#" + modaleAjout.data("jour"));
    const rangee = colonne.find(".rangee").filter(function () {
        return $(this).find(".heure").text() === tache.heure;
    });
    const tacheConteneur = rangee.find(".tache-conteneur");
    tacheConteneur.empty();
    const tacheElement = creerTacheElement(tache);
    tacheConteneur.append(tacheElement);
    modaleAjout.dialog("close");
}


// Sauvegarder la tâche modifiée

function sauvegarderTache() {
    const tache = modaleAjout.data("tache");
    const colonne = $("#" + tache.jour);
    const rangee = colonne.find(".rangee").filter(function () {
        return $(this).find(".heure").text() === tache.heure;
    });
    const tacheConteneur = rangee.find(".tache-conteneur");
    tacheConteneur.empty();

    tache.heure = $("#heure").val();
    tache.description = $("#description").val();
    tache.couleur = $("#couleur").val();

    const nouvelleRangee = colonne.find(".rangee").filter(function () {
        return $(this).find(".heure").text() === tache.heure;
    });
    const nouveauConteneur = nouvelleRangee.find(".tache-conteneur");

    const tacheElement = creerTacheElement(tache);
    nouveauConteneur.empty().append(tacheElement);
    modaleAjout.dialog("close");
}

// Supprimer la tâche
function supprimerTache() {
    const tache = modaleAjout.data("tache");
    const colonne = $("#" + tache.jour);
    const rangee = colonne.find(".rangee").filter(function () {
        return $(this).find(".heure").text() === tache.heure;
    });
    const tacheConteneur = rangee.find(".tache-conteneur");
    tacheConteneur.empty();
    modaleAjout.dialog("close");
}

// Initialiser le glisser-déposer
function initDragAndDrop() {
    $(".tache-conteneur").droppable({
        accept: ".tache",
        hoverClass: "hover",
        drop: function (event, ui) {
            const tacheElement = ui.draggable;
            tacheElement.detach().css({ top: 0, left: 0 }).appendTo(this);

            const nouvelleHeure = $(this).siblings(".heure").text();
            const description = tacheElement.text().split(" - ")[1];
            tacheElement.text(nouvelleHeure + " - " + description);
        },
    });

    $(".tache").draggable({
        revert: "invalid",
        zIndex: 1000,
        start: function (event, ui) {
            $(this).css("z-index", 1000);
        },
        stop: function (event, ui) {
            $(this).css("z-index", 1);
        },
    });
}

$(function () {
    configurerModaleAjout();
});