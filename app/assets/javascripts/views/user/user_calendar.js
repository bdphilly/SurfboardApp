SurfboardApp.Views.UserCalendar = Backbone.View.extend({

  template: JST['boards/calendar'],
  template2: JST['boards/calendar2'],

  initialize: function () {
    this.events = [];
    this.setEvents();
  },

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent); 

    this.renderCalendar();
    return this;
  },

  setEvents: function (callback) {
    var rentals = this.model.rentals();
    var that = this;
    
    rentals.each(function(rental){
      that.events.push({ 
        start: rental.get('start_date'), 
        end: rental.get('end_date'),
        status: rental.get('status'), 
        price: rental.get('price')
      });
      
    });
    // this.renderCalendar();
  },

  renderCalendar: function () {
    var theEvents = this.events;
    var that = this;
    
    this.$('.cal2').clndr({
      
      render: function (data) {
        return that.template2(data);
      },

      events: theEvents,

      multiDayEvents: {
        startDate: 'start',
        endDate: 'end'
      },

      clickEvents: {
        click: function(target) { 
          console.log(target);
          console.log(target.events[0].status);
          console.log(target.events[0].price);
           
        },
        nextMonth:     function(month)  { console.log('next month'); },
        previousMonth: function(month)  { console.log('previous month'); },
        nextYear:      function(month)  { console.log('next year'); },
        previousYear:  function(month)  { console.log('previous year'); },
        today:         function(month)  { console.log('today'); },
        onMonthChange: function(month)  { console.log('on month change'); },
        onYearChange:  function(month)  { console.log('on year change'); }
      },

      // doneRendering: function() {
      //   console.log("the events: ");
      //   console.log(theEvents);
      // },
    });    
  },
});