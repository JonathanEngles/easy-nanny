let enModification = false;


$(document).ready(function () {
  const jours = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
  ];

  const heures = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
  ];

  jours.forEach((jour) => {
      const colonne = $("<div>").addClass("jour").attr("id", jour);

      const enTete = $("<div>").addClass("en-tete");
      enTete.append($("<span>").text(jour));
      const btnAjouter = $("<button>").addClass("icone").text("＋");
      btnAjouter.on("click", function () {
          ouvrirModale(jour);
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

  const modale = $("#modale").dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
          "Ajouter la tâche": ajouterTache,
          Annuler: function () {
              modale.dialog("close");
          },
      },
      close: function () {
          modale.find("form")[0].reset();
      },
  });

  modale.find("form").on("submit", function (event) {
      event.preventDefault();
      ajouterTache();
  });


  function ouvrirModale(jour, tache = null) {
    modale.data("jour", jour);
    modale.data("tache", tache);
  
    const btnsContainer = $(".ui-dialog-buttonset");
  
    if (tache) {
      $("#heure").val(tache.data("heure"));
      $("#description").val(tache.find(".description").text());
      $("#couleur").val(tache.css("background-color"));
  
      btnsContainer.empty();
      btnsContainer.append('<button id="btnSauvegarder">Sauvegarder la tâche</button>');
      btnsContainer.append('<button id="btnSupprimer">Supprimer</button>');
      btnsContainer.append('<button id="btnAnnuler">Annuler</button>');
  
      $("#btnSauvegarder").off("click").click(function () {
        const tache = modale.data("tache");
        tache.find(".heure-tache").text($("#heure").val());
        tache.find(".description").text($("#description").val());
        tache.css("background-color", $("#couleur").val());
        modale.dialog("close");
      });
  
      $("#btnSupprimer").off("click").click(function () {
        const tache = modale.data("tache");
        tache.remove();
        modale.dialog("close");
      });
      
      $("#ajouter").hide();
      $("#supprimer").show();
      $("#sauvegarder").show();
  
      enModification = true;
    } else {
      $("#heure").val("");
      $("#description").val("");
      $("#couleur").val("#0000ff");
      
      $("#ajouter").show();
      $("#supprimer").hide();
      $("#sauvegarder").hide();
      
      btnsContainer.empty();
      btnsContainer.append('<button id="btnAjouter">Ajouter la tâche</button>');
      btnsContainer.append('<button id="btnAnnuler">Annuler</button>');
  
      $("#btnAjouter").off("click").click(ajouterTache);
  
      enModification = false;
    }
  
    $("#btnAnnuler").off("click").click(function () {
      modale.dialog("close");
    });
  
    modale.dialog("open");
  }
  

  function fermerModale() {
      modale.dialog("close");
  }

  function ajouterTache() {
      const jour = modale.data("jour");
      const heure = $("#heure").val();
      const description = $("#description").val();
      const couleur = $("#couleur").val();

      const tache = $("<div>").addClass("tache").css("background-color", couleur);
      tache.append($("<div>").addClass("heure-tache").text(heure));
      tache.append($("<div>").addClass("description").text(description));

      tache.on("dblclick", function (e) {
          e.stopPropagation();
          ouvrirModale(jour);
          modale.data("tache", tache);

          $("#heure").val(tache.data("heure"));
          $("#description").val(tache.find(".description").text());
          $("#couleur").val(tache.css("background-color"));

          $("#ajouter").hide();
          $("#sauvegarder").show();
          $("#supprimer").show();
      });

      const colonne = $("#" + jour);
      const rangee = colonne.find(".heure:contains(" + heure + ")").parent();
      rangee.find(".tache-conteneur").append(tache);

      fermerModale();
  }

  $("#ajouter").on("click", ajouterTache);

  $("#sauvegarder").on("click", function () {
      const tache = modale.data("tache");
      tache.find(".heure-tache").text($("#heure").val());
      tache.find(".description").text($("#description").val());
      tache.css("background-color", $("#couleur").val());
      fermerModale();
  });

  $("#supprimer").on("click", function () {
      const tache = modale.data("tache");
      tache.remove();
      fermerModale();
  });

  $(".tache-conteneur").sortable({
      connectWith: ".tache-conteneur",
      stop: function (event, ui) {
          const tacheDeplacee = ui.item;
          const nouveauJour = tacheDeplacee.closest(".jour").attr("id");
          const nouvelleHeure = tacheDeplacee.closest(".rangee").find(".heure").text();

          tacheDeplacee.data("jour", nouveauJour);
          tacheDeplacee.data("heure", nouvelleHeure);

          tacheDeplacee.find(".heure-tache").remove();
          const nouvelleHeureElem = $("<div>").addClass("heure-tache").text(nouvelleHeure);
          tacheDeplacee.prepend(nouvelleHeureElem);

          tacheDeplacee.off("dblclick");
          tacheDeplacee.on("dblclick", function () {
              ouvrirModale(nouveauJour);
              modale.data("tache", tacheDeplacee);

              $("#heure").val(tacheDeplacee.data("heure"));
              $("#description").val(tacheDeplacee.find(".description").text());
              $("#couleur").val(tacheDeplacee.css("background-color"));

              $("#ajouter").hide();
              $("#sauvegarder").show();
              $("#supprimer").show();
          });
      },
  });
});
