document.addEventListener('DOMContentLoaded', function () {



  fetch('/nanny/activities')
    .then(response => response.json())
    .then(activities => {
      let calendarEl = document.getElementById('calendar-nanny');
      let initialView = 'timeGridDay';
      if (window.innerWidth >= 1024) {
        initialView = 'timeGridWeek'; // 
      }
      let calendar = new FullCalendar.Calendar(calendarEl, {
        height: 'auto',
        weekNumberCalculation: 'ISO',
        firstDay: 1,
        allDaySlot: false,
        slotMinTime: "07:00:00",
        slotMaxTime: "20:00:00",
        // editable: true,
        // eventResizableFromStart: true,
        locale: 'fr',
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        headerToolbar: {
          left: 'timeGridDay',
          center: 'title',
          right: 'prev,next today'
        },
        buttonText: {
          today: 'Aujourd\'hui',
          week: 'Semaine',
          day: 'Journée'
        },

        events: activities.map(activity => ({
          title: activity.title,
          start: activity.start,
          end: activity.end,
          color: "#" + activity.color,
          description: activity.description
        })),

      });
      calendar.render();

      function updateButtonVisibility() {
        if (window.innerWidth >= 650) {
          calendar.setOption('headerToolbar', {
            left: 'timeGridDay, timeGridWeek',
            center: 'title',
            right: 'prev,next today'
          });
        } else {
          calendar.setOption('headerToolbar', {
            center: 'title',
            right: 'prev,next today'
          });
        }
      }


      updateButtonVisibility();
      window.addEventListener('resize', updateButtonVisibility);
      calendar.changeView(initialView);
//manage the event on click on the event
      var eventModal = document.getElementById('eventModal');
      var eventTitle = document.getElementById('eventTitle');
      var eventDescription = document.getElementById('eventDescription');

    
      calendar.on('eventClick', function (info) {
     
        var event = info.event;

       
        eventTitle.textContent = event.title;
        eventDescription.textContent = event.extendedProps.description;

        // Afficher la modal
        eventModal.style.display = 'block';
      });

      // Gérer la fermeture de la modal lorsque l'utilisateur clique sur la croix
      var closeBtn = document.getElementById('btn-close-event');
      closeBtn.onclick = function () {
        eventModal.style.display = 'none';
      };


    });
});