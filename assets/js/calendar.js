document.addEventListener('DOMContentLoaded', function() {
    fetch('/parent/activities')
      .then(response => response.json())
      .then(activities => {
        let calendarEl = document.getElementById('calendar-parent');
        let calendar = new FullCalendar.Calendar(calendarEl, {
          height: 'auto',
          weekNumberCalculation: 'ISO',
  firstDay: 1,
          initialView: 'timeGridDay',
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
            left: 'timeGridDay, timeGridWeek',
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
      });
  });