SurfboardApp.Views.CalendarPage = Backbone.View.extend({

  template: JST['boards/calendar'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent); 
    this.$el.find('.cal2').clndr({
      template: this.calendarTemplate
    });
    // this.renderCalendar();
    return this;
  },

  calendarTemplate: '<div id="calendar-template"><div class="clndr-controls"><div class="clndr-previous-button">&lsaquo;</div><div class="month"><%= month %></div><div class="clndr-next-button">&rsaquo;</div></div><div class="clndr-grid"><div class="days-of-the-week"><% _.each(daysOfTheWeek, function(day) { %><div class="header-day"><%= day %></div><% }); %><div class="days"><% _.each(days, function(day) { %><div class="<%= day.classes %>"><%= day.day %></div><% }); %></div></div></div><div class="clndr-today-button">Today</div></div>',

  // renderCalendar: function () {
  //   var currentMonth = moment().format('YYYY-MM');
  //   var nextMonth    = moment().add('month', 1).format('YYYY-MM');
  //   var events = [
  //     { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
  //     { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
  //     { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
  //     { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
  //   ];  

  //   this.el$.find('#mini-calendar').clndr({
  //     template: this.el$.find('#calendar-template').html(),
  //     events: events,
  //   });
  // },



});