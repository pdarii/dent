export const CALENDARCONFIG = {
        // lang: 'uk',
        locale: 'uk',
        defaultTimedEventDuration: '00:30:00',
        firstDay: '1',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month agendaWeek agendaDay'
        },
        allDaySlot: false,
        timeFormat: 'H(:mm)', // uppercase H for 24-hour clock
        weekNumbers: false,
        editable: true,
        height: '200px',
        fixedWeekCount: false,
        eventLimit: true, // allow "more" link when too many events
        views: {
          agendaDay: {
            minTime: '07:00:00',
            maxTime: '22:00:00',
            axisFormat: 'H(:mm)'
          }
        },
        events: [],
        dayClick: function (date, jsEvent, view) {
          // console.log(this);
          // console.log(this.parent);
          // view.gotoDate(date);
          // this('changeView', 'agendaDay');
        },
        eventClick: function (calEvent, jsEvent, view) {
          jQuery('.fc').fullCalendar('gotoDate', calEvent.start);
          jQuery('.fc').fullCalendar('changeView', 'agendaDay');
        }
};
