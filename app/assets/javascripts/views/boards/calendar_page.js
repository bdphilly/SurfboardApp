SurfboardApp.Views.CalendarPage = Backbone.View.extend({

  template: JST['boards/calendar'],
  template2: JST['boards/calendar2'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent); 

    this.renderCalendar();
    return this;
  },

  
  renderCalendar: function () {
   // var calendarTemplate = '<div id="calendar-template"><div class="clndr-controls"><div class="clndr-previous-button">&lsaquo;</div><div class="month"><%= month %></div><div class="clndr-next-button">&rsaquo;</div></div><div class="clndr-grid"><div class="days-of-the-week"><% _.each(daysOfTheWeek, function(day) { %><div class="header-day"><%= day %></div><% }); %><div class="days"><% _.each(days, function(day) { %><div class="<%= day.classes %>"><% if (day.events[0]) { %><% $(day).addClass("available") %>"><% } %><%= day.day %><br><% if(day.events[0]) { %><%= day.events[0].cost %><br><%= day.events[0].status %><% } %></div><% }); %></div></div></div><div class="clndr-today-button">Today</div></div>';

   



   // var calendarTemplate = '<div id="calendar-template"><div class="clndr-controls"><div class="clndr-previous-button">&lsaquo;</div><div class="month"><%= month %></div><div class="clndr-next-button">&rsaquo;</div></div><div class="clndr-grid"><div class="days-of-the-week"><% _.each(daysOfTheWeek, function(day) { %><div class="header-day"><%= day %></div><% }); %><div class="days"><% _.each(days, function(day) { %><%= day.day %><br><% if (day.events[0]) { %><%= day.events[0].cost %><br><%= day.events[0].status %><% } %></div><% }); %></div></div></div><div class="clndr-today-button">Today</div></div>';
    

// <% if (day.events[0].status === "Available") { %>
//           <div class="<%= day.event-available %>">
//         <% else { %> 
//           <div class="<%= day.event-unavailable %>">
//         <% } %>



    // // var templateCalendar = '<div id="template-calendar"><div class="clndr-controls"><div class="clndr-previous-button">&lsaquo;</div><div class="month"><%= month %></div><div class="clndr-next-button">&rsaquo;</div></div><div class="clndr-grid"><div class="days-of-the-week"><% _.each(daysOfTheWeek, function(day) { %><div class="header-day"><%= day %></div><% }); %><div class="days"><% _.each(days, function(day) { %><div class="<%= day.classes %>"><%= day.day %></div><% }); %></div></div><div class="event-listing"><div class="event-listing-title">EVENTS THIS MONTH</div><% _.each(eventsThisMonth, function(event) { %><div class="event-item"><div class="event-item-name"><%= event.name %></div><div class="event-item-location"><%= event.location %></div></div><% }); %></div></div><div class="clndr-today-button">Today</div></div>'

    // <% if(day.events[0].status) { %>
    //     <%= day.events[0].cost %>
    //   <% } %>

      // <% if (day.events[0].status) { %>
      //   <% if ()}

      // <div class="<%= day.classes %>">



    var currentMonth = moment().format('YYYY-MM');
    var nextMonth    = moment().add('month', 1).format('YYYY-MM');
    
    var events = [
      { date: currentMonth + '-' + '10', status: 'Available', cost: '$15' },
      { date: currentMonth + '-' + '19', status: 'Unavailable', cost: '$10' },
      { date: currentMonth + '-' + '23', status: 'Available', cost: '$20' },
      { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
    ];

    // this.$el.find('.cal1').clndr({
    //   template: calendarTemplate
    // });

    var that = this;

    this.$el.find('.cal2').clndr({
      
      render: function (data) {
        return that.template2(data);
      },


      // template: this.template2(),
      events: events,

      

      clickEvents: {
        click:         function(target) { 
          console.log('click');
          console.log(target.events[0].status);
          console.log(target.events[0].cost);
           
        },
        nextMonth:     function(month)  { console.log('next month'); },
        previousMonth: function(month)  { console.log('previous month'); },
        nextYear:      function(month)  { console.log('next year'); },
        previousYear:  function(month)  { console.log('previous year'); },
        today:         function(month)  { console.log('today'); },
        onMonthChange: function(month)  { console.log('on month change'); },
        onYearChange:  function(month)  { console.log('on year change'); }
      },

    });
  },



});

// <div id="template-calendar">
//   <div class="clndr-controls">
//     <div class="clndr-previous-button">&lsaquo;</div>
//     <div class="month"><%= month %></div>
//     <div class="clndr-next-button">&rsaquo;</div>
//   </div>
//   <div class="clndr-grid">
//     <div class="days-of-the-week">
//       <% _.each(daysOfTheWeek, function(day) { %>
//         <div class="header-day"><%= day %></div>
//       <% }); %>
//       <div class="days">
//         <% _.each(days, function(day) { %>
//           <div class="<%= day.classes %>"><%= day.day %></div>
//         <% }); %>
//       </div>
//     </div>

//     <div class="event-listing">
//       <div class="event-listing-title">EVENTS THIS MONTH</div>
//       <% _.each(eventsThisMonth, function(event) { %>
//           <div class="event-item">
//             <div class="event-item-name"><%= event.name %></div>
//             <div class="event-item-location"><%= event.location %></div>
//           </div>
//         <% }); %>
//     </div>

//   </div>
//   <div class="clndr-today-button">Today</div>
// </div>
