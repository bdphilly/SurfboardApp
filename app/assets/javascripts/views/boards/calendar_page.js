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
    var currentMonth = moment().format('YYYY-MM');
    var nextMonth    = moment().add('month', 1).format('YYYY-MM');
    
    var events = [
      { date: currentMonth + '-' + '10', status: 'Available', cost: '$15' },
      { date: currentMonth + '-' + '19', status: 'Rented', cost: '$10' },
      { date: currentMonth + '-' + '23', status: 'Available', cost: '$20' },
      { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
    ];

    var that = this;

    this.$el.find('.cal2').clndr({
      
      render: function (data) {
        return that.template2(data);
      },

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