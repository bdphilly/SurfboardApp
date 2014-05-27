SurfboardApp.Views.CalendarPage = Backbone.View.extend({

  template: JST['boards/calendar'],
  template2: JST['boards/calendar2'],

  initialize: function () {
    this.events = [];
    // this.listenTo(this.model, 'sync', this.renderCalendar);
    // this.model.rentals().fetch();
    // this.listenTo(this.model)
    // this.listenTo(this.model, 'all', this.setEvents);
    // this.listenTo(this.model, 'all', this.renderCalendar);
    // this.renderCalendar();
    this.setEvents();
  },

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent); 

    this.renderCalendar();
    return this;
  },

  setEvents: function (callback) {
    // this.events = [];
    console.log('each loop');
    console.log(this.events);
    var rentals = this.model.rentals();
    var that = this;
    
    rentals.each(function(rental){
      that.events.push({ 
        date: rental.get('start_date'), 
        status: rental.get('status'), 
        price: rental.get('price')
      });
      
    });
    debugger
    // this.renderCalendar();
  },

  renderCalendar: function () {
    // var currentMonth = moment().format('YYYY-MM');
    // var nextMonth    = moment().add('month', 1).format('YYYY-MM');
    // var events = [
    //   { date: currentMonth + '-' + '10', status: 'AVAILABLE', price: '$15' },
    //   { date: currentMonth + '-' + '19', status: 'UNAVAILABLE', price: '$10' },
    //   { date: currentMonth + '-' + '23', status: 'AVAILABLE', price: '$20' },
    // ];

    // var lotsOfEvents = [
    //   { start: '2014-11-04', end: '2014-11-08', title: 'Monday to Friday Event' },
    //   { start: '2014-11-15', end: '2014-11-20', title: 'Another Long Event' }
    // ];
    debugger
    var theEvents = this.events;
    console.log('in the render')
    console.log(this.events);
    
    var that = this;
    
    this.$('.cal2').clndr({
      
      render: function (data) {
        return that.template2(data);
      },

      events: theEvents,

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

      doneRendering: function() {
        console.log("the events: ");
        console.log(theEvents);
      },


    });

    
    
  },

});