SurfboardApp.Views.CalendarPage = Backbone.View.extend({

  template: JST['boards/calendar'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent); 

    this.renderCalendar();
    return this;
  },

  
  renderCalendar: function () {
    var calendarTemplate = '<div id="calendar-template"><div class="clndr-controls"><div class="clndr-previous-button">&lsaquo;</div><div class="month"><%= month %></div><div class="clndr-next-button">&rsaquo;</div></div><div class="clndr-grid"><div class="days-of-the-week"><% _.each(daysOfTheWeek, function(day) { %><div class="header-day"><%= day %></div><% }); %><div class="days"><% _.each(days, function(day) { %><div class="<%= day.classes %>"><%= day.day %></div><% }); %></div></div></div><div class="clndr-today-button">Today</div></div>';

    this.$el.find('.cal1').clndr({
      template: calendarTemplate
    });

    this.$el.find('.cal2').clndr({
      template: calendarTemplate
    });
  },



});