document.addEventListener('DOMContentLoaded', function() {
    fetch('/parent/activities')
      .then(response => response.json())
      .then(activities => {
        let calendarEl = document.getElementById('calendar-parent');
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

        
      });
  });