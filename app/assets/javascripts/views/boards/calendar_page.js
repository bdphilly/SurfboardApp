SurfboardApp.Views.CalendarPage = Backbone.View.extend({

  template: JST['boards/calendar'],

  initialize: function () {
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent); 
    // this.$el.find('#mini-calendar').clndr({
    //   template: $('#calendar-template').html()
    // });
    renderCalendar();
    return this;
  },

  renderCalendar: function () {
    var currentMonth = moment().format('YYYY-MM');
    var nextMonth    = moment().add('month', 1).format('YYYY-MM');
    var events = [
      { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
      { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
      { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
      { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
    ];  

    this.el$.find('#mini-calendar').clndr({
      template: this.el$.find('#calendar-template').html(),
      events: events,
      clickEvents: {
        click: function(target) {
          if(target.events.length) {
            var daysContainer = $('#mini-clndr').find('.days-container');
            daysContainer.toggleClass('show-events', true);
            $('#mini-clndr').find('.x-button').click( function() {
              daysContainer.toggleClass('show-events', false);
            });
          }
        }
      },
      adjacentDaysChangeMonth: true
    });
  },



});